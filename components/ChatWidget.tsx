'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `You are the AI assistant for LuisPDoesAI on luispdoesai.com.
You help potential clients understand services, pricing, and process.
Services: AI Automations, Agentic Systems, Custom AI Builds.
Pricing: Audits from $3,500 | Projects from $15,000 | Retainers from $2,500/month.
Always be concise, human, and helpful. End with a soft CTA when appropriate.
Direct booking questions to: https://calendly.com/luispadilla
IMPORTANT: Do not use any markdown formatting (no asterisks, no bold, no bullet points). Use plain text only.`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi. I'm the LuisPDoesAI assistant. How can I help you scale today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const historyToSend = newMessages.filter((msg, index) => {
        if (index === 0 && msg.role === 'assistant') return false;
        return true;
      }).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: historyToSend,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });

      let assistantMsg = response.text || "I'm sorry, I couldn't generate a response.";
      
      // Strip out common markdown symbols just in case the model ignores the prompt
      assistantMsg = assistantMsg.replace(/[*#_`]/g, '');
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMsg }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-dm">
      {/* Chat Panel */}
      <div 
        className={`absolute bottom-20 right-0 w-[350px] h-[500px] bg-brand-dark-gray border border-brand-mid-gray flex flex-col origin-bottom-right transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-brand-mid-gray flex justify-between items-center bg-brand-black">
          <span className="font-playfair text-lg">LuisPDoesAI Assistant</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-brand-muted-gray hover:text-brand-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-5 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'self-end bg-brand-mid-gray text-brand-white' : 'self-start bg-transparent border border-brand-mid-gray text-brand-white'}`}
            >
              {msg.content}
            </div>
          ))}
          
          {isTyping && (
            <div className="self-start p-3 border border-brand-mid-gray flex gap-1 items-center h-10">
              <div className="w-1.5 h-1.5 bg-brand-muted-gray typing-dot" style={{ borderRadius: '50%' }}></div>
              <div className="w-1.5 h-1.5 bg-brand-muted-gray typing-dot" style={{ borderRadius: '50%' }}></div>
              <div className="w-1.5 h-1.5 bg-brand-muted-gray typing-dot" style={{ borderRadius: '50%' }}></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-brand-mid-gray flex gap-2.5 bg-brand-black">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about our services..."
            className="flex-grow bg-transparent border-none text-brand-white text-sm outline-none placeholder:text-brand-muted-gray"
          />
          <button 
            onClick={handleSend}
            className="text-brand-white hover:-translate-y-0.5 hover:translate-x-0.5 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-black text-brand-white border-2 border-brand-white font-playfair font-semibold text-xl flex items-center justify-center relative transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
        style={{ borderRadius: '50%' }}
      >
        <div className="absolute inset-0 border border-brand-white/50 animate-pulse-border -z-10" style={{ borderRadius: '50%' }}></div>
        {isOpen ? <X size={24} /> : 'AI'}
      </button>
    </div>
  );
}
