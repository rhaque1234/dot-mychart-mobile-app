/**
 * Anthropic Claude API wrapper for browser-side calls.
 *
 * NOTE: This calls the Anthropic API directly from the browser, which exposes
 * the API key in the network tab. This is acceptable for a developer-facing
 * console/demo tool. For production, use a backend proxy.
 */

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY
const MODEL = import.meta.env.VITE_ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'

/**
 * Send a chat message to Anthropic Claude.
 *
 * @param {string} systemPrompt - Dot's system prompt with clinical context
 * @param {Array<{role: string, content: string}>} messages - Chat history
 * @returns {Promise<string>} - The assistant's response text
 */
export async function sendChatMessage(systemPrompt, messages) {
  if (!API_KEY) {
    throw new Error(
      'No Anthropic API key configured. Create a .env file with VITE_ANTHROPIC_API_KEY=sk-ant-...'
    )
  }

  // Convert internal roles to Anthropic API roles
  const apiMessages = messages
    .filter((m) => m.role === 'dot' || m.role === 'patient')
    .map((m) => ({
      role: m.role === 'dot' ? 'assistant' : 'user',
      content: m.content,
    }))

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      system: systemPrompt,
      messages: apiMessages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err.error?.message || `Anthropic API error: ${response.status}`
    )
  }

  const data = await response.json()
  return data.content[0].text
}
