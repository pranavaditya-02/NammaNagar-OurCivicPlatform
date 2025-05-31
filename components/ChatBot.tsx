"use client"

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Camera, Loader2, ImagePlus } from 'lucide-react'
import { Button } from './ui/button'
import { useChat } from './chat-context'
import { cn } from '@/lib/utils'

export function ChatBot() {
  const { isOpen, toggleChat, messages, sendMessage, isProcessing } = useChat()
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() && attachments.length === 0) return
    
    await sendMessage(input, attachments)
    setInput('')
    setAttachments([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Convert files to URLs - in production, you'd upload to storage
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setAttachments(prev => [...prev, ...urls])
    }
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4">
      {!isOpen ? (
        <Button
          onClick={toggleChat}
          className="rounded-full w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg"
        >
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      ) : (
        <div className="bg-white w-[320px] h-[600px] sm:h-[600px] sm:w-[380px] rounded-lg shadow-xl flex flex-col">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="font-semibold text-sm sm:text-base">NammaNagar AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="hover:bg-white/20 text-white h-8 w-8 sm:h-10 sm:w-10"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 sm:px-4 sm:py-2 max-w-[85%] sm:max-w-[80%] text-sm sm:text-base",
                    message.type === 'user'
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  {message.text}
                  {(message.attachments ?? []).length > 0 && (
                    <div className="mt-2 flex gap-1 sm:gap-2">
                      {(message.attachments ?? []).map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt="attachment"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-3 py-2 sm:px-4 sm:py-2">
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 sm:p-4 border-t">
            {attachments.length > 0 && (
              <div className="flex gap-1 sm:gap-2 mb-2 overflow-x-auto pb-2">
                {attachments.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="attachment"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0 h-8 w-8 sm:h-10 sm:w-10"
              >
                <ImagePlus className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-8 w-8 sm:h-10 sm:w-10"
                disabled={isProcessing}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}