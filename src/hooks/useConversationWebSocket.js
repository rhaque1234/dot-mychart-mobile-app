import { useEffect, useState, useRef, useCallback } from 'react'

// WebSocket server URL - can be configured via environment variable
const WS_URL = import.meta.env.VITE_CONVERSATION_WS_URL || 'wss://0.0.0.0:8765'

export default function useConversationWebSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [conversations, setConversations] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const reconnectAttemptsRef = useRef(0)

  const MAX_RECONNECT_ATTEMPTS = 5
  const RECONNECT_DELAY = 3000

  // Connect to WebSocket
  const connect = useCallback(() => {
    try {
      console.log('Connecting to WebSocket:', WS_URL)
      const ws = new WebSocket(WS_URL)

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setError(null)
        reconnectAttemptsRef.current = 0
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('WebSocket message received:', data)

          // Handle different message types
          if (data.type === 'session_list') {
            setConversations(data.sessions || [])
          } else if (data.type === 'session_detail') {
            setCurrentSession(data.session)
          } else if (data.type === 'events') {
            // Real-time event update
            if (data.session_id === currentSession?.session_id) {
              setCurrentSession(prev => ({
                ...prev,
                events: data.events
              }))
            }
          } else if (data.type === 'live_event') {
            // Real-time streaming event
            setConversations(prev => {
              const updated = [...prev]
              const sessionIndex = updated.findIndex(s => s.session_id === data.session_id)
              if (sessionIndex >= 0) {
                if (!updated[sessionIndex].events) {
                  updated[sessionIndex].events = []
                }
                updated[sessionIndex].events.push(data.event)
              }
              return updated
            })

            // Also update currentSession if this event belongs to it
            setCurrentSession(prev => {
              if (prev && prev.session_id === data.session_id) {
                return {
                  ...prev,
                  events: [...(prev.events || []), data.event]
                }
              }
              return prev
            })
          } else if (data.type === 'error') {
            setError(data.message)
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setError('Connection error')
      }

      ws.onclose = () => {
        console.log('WebSocket closed')
        setIsConnected(false)

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current++
          console.log(`Reconnection attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`)
          reconnectTimeoutRef.current = setTimeout(() => {
            connect()
          }, RECONNECT_DELAY)
        } else {
          setError('Unable to connect to Dot device. Please check connection.')
        }
      }

      wsRef.current = ws
    } catch (err) {
      console.error('Error creating WebSocket:', err)
      setError('Failed to connect to Dot device')
    }
  }, [])

  // Send message to WebSocket
  const sendMessage = useCallback((message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
      return true
    } else {
      console.error('WebSocket not connected')
      return false
    }
  }, [])

  // List all sessions
  const listSessions = useCallback((limit = 50, offset = 0) => {
    setIsLoading(true)
    sendMessage({
      action: 'list_sessions',
      limit,
      offset
    })
  }, [sendMessage])

  // Get specific session
  const getSession = useCallback((sessionId) => {
    setIsLoading(true)
    sendMessage({
      action: 'get_session',
      session_id: sessionId
    })
  }, [sendMessage])

  // Get events for a session
  const getEvents = useCallback((sessionId, eventType = null) => {
    setIsLoading(true)
    const message = {
      action: 'get_events',
      session_id: sessionId
    }
    if (eventType) {
      message.event_type = eventType
    }
    sendMessage(message)
  }, [sendMessage])

  // Get transcript (clean conversation only)
  const getTranscript = useCallback((sessionId) => {
    setIsLoading(true)
    sendMessage({
      action: 'get_transcript',
      session_id: sessionId
    })
  }, [sendMessage])

  // Search events
  const searchEvents = useCallback((query, sessionId = null) => {
    setIsLoading(true)
    const message = {
      action: 'search',
      query
    }
    if (sessionId) {
      message.session_id = sessionId
    }
    sendMessage(message)
  }, [sendMessage])

  // Subscribe to live events
  const subscribe = useCallback((sessionId = null) => {
    const message = {
      action: 'subscribe'
    }
    if (sessionId) {
      message.session_id = sessionId
    }
    sendMessage(message)
  }, [sendMessage])

  // Unsubscribe from live events
  const unsubscribe = useCallback(() => {
    sendMessage({
      action: 'unsubscribe'
    })
  }, [sendMessage])

  // Connect on mount
  useEffect(() => {
    connect()

    // Cleanup on unmount
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [connect])

  return {
    isConnected,
    conversations,
    currentSession,
    isLoading,
    error,
    listSessions,
    getSession,
    getEvents,
    getTranscript,
    searchEvents,
    subscribe,
    unsubscribe
  }
}
