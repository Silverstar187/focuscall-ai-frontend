import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { crypto } from 'https://deno.land/std@0.168.0/crypto/mod.ts'

serve(async (req) => {
  try {
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const vpsWebhookUrl = Deno.env.get('VPS_WEBHOOK_URL')!
    const webhookSecret = Deno.env.get('WEBHOOK_SECRET')!

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    const { agent_id, telegram_bot_token, llm_api_key, llm_provider } = await req.json()

    if (!agent_id || !telegram_bot_token || !llm_api_key) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get agent data from database
    const { data: agent, error: agentError } = await supabase
      .from('user_agents')
      .select('*')
      .eq('id', agent_id)
      .single()

    if (agentError || !agent) {
      return new Response(
        JSON.stringify({ error: 'Agent not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Generate HMAC signature
    const timestamp = Math.floor(Date.now() / 1000).toString()
    const signaturePayload = `${agent.user_id}:${agent_id}:${timestamp}`
    
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(signaturePayload)
    )
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')

    // Call VPS webhook
    const response = await fetch(vpsWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      },
      body: JSON.stringify({
        user_id: agent.user_id,
        agent_id: agent_id,
        llm_key: llm_api_key,
        bot_token: telegram_bot_token,
        llm_provider: llm_provider || 'openai',
        config_markdown: agent.config_markdown,
      }),
    })

    if (!response.ok) {
      throw new Error(`VPS webhook failed: ${response.status}`)
    }

    // Update agent status
    await supabase
      .from('user_agents')
      .update({ status: 'deploying', updated_at: new Date().toISOString() })
      .eq('id', agent_id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Deployment initiated',
        status: 'deploying'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Provision error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Deployment failed',
        message: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
