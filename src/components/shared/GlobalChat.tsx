"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, User, Minimize2, Maximize2 } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export function GlobalChat() {
  const { 
    currentUser, 
    activeChatUserId, 
    closeChat, 
    entrepreneurs, 
    chatMessages, 
    sendMessage 
  } = useAppContext();
  
  const [text, setText] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (!isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeChatUserId, isMinimized]);

  if (!activeChatUserId || !currentUser) return null;

  const recipient = entrepreneurs.find(e => e.id === activeChatUserId);
  if (!recipient) return null;

  // Filter messages between current user and recipient
  const conversation = chatMessages.filter(
    m => (m.senderId === currentUser.id && m.recipientId === recipient.id) ||
         (m.senderId === recipient.id && m.recipientId === currentUser.id)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(recipient.id, text.trim());
    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] w-80 sm:w-96 bg-card border rounded-t-xl rounded-b-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out" style={{ height: isMinimized ? 'auto' : '500px', maxHeight: 'calc(100vh - 32px)' }}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 border-b bg-primary/5 cursor-pointer rounded-t-xl"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          <Avatar src={recipient.profileImage} fallback={recipient.name.charAt(0)} size="sm" />
          <div>
            <h4 className="font-semibold text-sm leading-tight">{recipient.name}</h4>
            <p className="text-[10px] text-muted-foreground line-clamp-1">{recipient.companyName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={(e) => { e.stopPropagation(); closeChat(); }}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <>
          <div className="flex-1 p-4 overflow-y-auto bg-muted/10 space-y-4">
            {conversation.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground opacity-70">
                <User className="h-8 w-8 mb-2" />
                <p className="text-sm">Start a conversation with {recipient.name.split(' ')[0]}</p>
              </div>
            ) : (
              conversation.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 mx-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer (Input) */}
          <div className="p-3 border-t bg-card rounded-b-lg">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Write a message..."
                className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button type="submit" size="icon" className="rounded-full h-9 w-9 shrink-0 bg-primary" disabled={!text.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
