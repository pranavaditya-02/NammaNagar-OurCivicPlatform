"use client"

import { createContext, useContext, useState } from 'react'
import { MessageCircle } from 'lucide-react'

type ChatMessage = {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
  category?: 'infrastructure' | 'complaint' | 'query' | 'suggestion'
  attachments?: string[]
}

type ChatContextType = {
  isOpen: boolean
  messages: ChatMessage[]
  toggleChat: () => void
  sendMessage: (text: string, attachments?: string[]) => Promise<void>
  isProcessing: boolean
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  messages: [],
  toggleChat: () => {},
  sendMessage: async () => {},
  isProcessing: false
})

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      text: `Welcome to NammaNagar AI Assistant! I can help you with:
• Reporting infrastructure issues
• Tracking project status
• Finding relevant authorities
• Filing RTI requests
How can I assist you today?`,
      timestamp: new Date()
    }
  ])
  const [isProcessing, setIsProcessing] = useState(false)

  const processWithAI = async (text: string) => {
    // Common keywords and their responses
    const keywords = {
      weed: {
        category: 'infrastructure',
        response: `I understand you're reporting an issue with weeds in your area. To help you better:

1. 📸 Please attach a photo of the affected area
2. 📍 Share your location or area name
3. 🗺️ Mention any landmarks nearby

This will help us route your complaint to the relevant municipal department.`
      },
      infrastructure: {
        category: 'query',
        response: `I can help you report various infrastructure issues:

• 🛣️ Road conditions (potholes, broken pavements)
• 💧 Water supply problems
• 💡 Street lighting issues
• 🌳 Parks and green spaces
• 🚯 Garbage collection
• 🚽 Public sanitation

What specific issue would you like to report?`
      },
      report: {
        category: 'query',
        response: `To file a report, you can:

1. 📸 Upload photos of the issue
2. 📍 Share the location
3. 📝 Provide a brief description

Would you like to start reporting an issue now?`
      }
    }

    // Check for keywords in the input text
    const lowercaseText = text.toLowerCase()
    for (const [key, value] of Object.entries(keywords)) {
      if (lowercaseText.includes(key)) {
        return value
      }
    }

    // Default response for unclear inputs
    return {
      category: 'query',
      response: `I'm here to help! Could you please:

1. 📸 Share a photo of the issue (if applicable)
2. 🗺️ Provide the location details
3. 📝 Describe what needs to be addressed

This will help me assist you better.`
    }
  }

  const sendMessage = async (text: string, attachments: string[] = []) => {
    setIsProcessing(true)
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date(),
      attachments
    }
    setMessages(prev => [...prev, userMessage])

    // Process with AI
    const aiResponse = await processWithAI(text)
    
    // Add bot response
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: aiResponse.response,
      timestamp: new Date(),
      category: aiResponse.category as any
    }
    setMessages(prev => [...prev, botMessage])
    
    setIsProcessing(false)
  }

  const toggleChat = () => setIsOpen(prev => !prev)

  return (
    <ChatContext.Provider 
      value={{ 
        isOpen, 
        messages, 
        toggleChat, 
        sendMessage, 
        isProcessing
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)