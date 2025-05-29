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
    const lowercaseText = text.toLowerCase().trim();

    // Exact match for smalltalk
    const smalltalk = [
      { keys: ['how are you', 'how r u', 'how do you do'], response: "I'm just a bot, but I'm here to help you with any civic issues or questions you have! 😊" },
      { keys: ['hello', 'hi', 'hey'], response: "Hello! 👋 How can I assist you with your civic needs today?" },
      { keys: ['thank', 'thanks', 'thank you'], response: "You're welcome! If you have more questions or want to report an issue, just let me know." },
      { keys: ['bye', 'goodbye', 'see you'], response: "Goodbye! Feel free to reach out anytime you need help with civic issues." }
    ];
    for (const entry of smalltalk) {
      if (entry.keys.some(k => lowercaseText === k)) {
        return { category: 'smalltalk', response: entry.response };
      }
    }

    // Civic keywords (partial match)
    const keywords = [
      {
        keys: ['weed'],
        response: `I understand you're reporting an issue with weeds in your area. To help you better:

1. 📸 Please attach a photo of the affected area
2. 📍 Share your location or area name
3. 🗺️ Mention any landmarks nearby

This will help us route your complaint to the relevant municipal department.`,
        category: 'infrastructure'
      },
      {
        keys: ['infrastructure'],
        response: `I can help you report various infrastructure issues:

• 🛣️ Road conditions (potholes, broken pavements)
• 💧 Water supply problems
• 💡 Street lighting issues
• 🌳 Parks and green spaces
• 🚯 Garbage collection
• 🚽 Public sanitation

What specific issue would you like to report?`,
        category: 'query'
      },
      {
        keys: ['report'],
        response: `To file a report, you can:

1. 📸 Upload photos of the issue
2. 📍 Share the location
3. 📝 Provide a brief description

Would you like to start reporting an issue now?`,
        category: 'query'
      },
      {
        keys: ['address', 'location', 'share address'],
        response: `To share your address or location:
1. Use the location sharing option in the report form, or
2. Type your address or landmark in the message box.
This helps us route your issue to the right department!`,
        category: 'query'
      }
    ];
    for (const entry of keywords) {
      if (entry.keys.some(k => lowercaseText.includes(k))) {
        return { category: entry.category, response: entry.response };
      }
    }

    // Fallback: Use an AI/ML API for open-ended questions
    try {
      const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful civic assistant for the NammaNagar platform. Answer user questions about civic issues, infrastructure, and general queries in a friendly and concise way." },
            { role: "user", content: text }
          ],
          max_tokens: 150
        })
      });
      const data = await apiResponse.json();
      const aiText = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't process your request. Please try again.";
      return {
        category: 'ai',
        response: aiText
      }
    } catch (err) {
      return {
        category: 'ai',
        response: "I'm here to help! Could you please provide more details or try rephrasing your question?"
      }
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