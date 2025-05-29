"use client"

import { createContext, useContext, useState } from 'react'

type ChatContextType = {
  isOpen: boolean
  toggleChat: () => void
}

const ChatContext = createContext<ChatContextType>({
  isOpen: false,
  toggleChat: () => {},
})

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(prev => !prev)

  return (
    <ChatContext.Provider value={{ isOpen, toggleChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)