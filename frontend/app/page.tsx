'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';


export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    //1. Kullanıcının yazdığı mesajı ekle
    const newUserMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    const currentInput = input; // Mevcut input değerini sakla
    setInput('');
    setIsLoading(true);

    try {
      //2. Node.js API'mize POST isteği gönder
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Sunucu hatası');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    }

    catch (error) {
      console.error("API Bağlantı Hatası:", error);
      //Hata durumunda kullanıcıyı bilgilendir
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sunucuya bağlanılamadı. Node.js backend\'inin çalıştığından emin ol.'
      }]);
    }

    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-black text-white">
        <div className="flex flex-1 items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-2xl">

            {/* Başlık Alanı */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Game Dev AI Guide</h1>
              <p className="text-gray-600">Your AI assistant for game development guidance.</p>
            </div>

            {/*Mesajların Gösterildiği Alan*/}
            {messages.length > 0 && (
              <Card className="mt-4 p-4 bg-gray-900 border-gray-700">
                <ScrollArea className="h-64">
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className={`inline-block px-3 py-1 rounded ${message.role === 'user' ? 'bg-olive-100 text-black' : 'bg-gray-200 text-black'}`}>
                        {message.content}
                      </span>
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            )}

            {/*Input Alanı*/}
            <form onSubmit={handleSubmit} className="mt-4 flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button className="bg-gray-700 hover:bg-gray-600 text-white" type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );


}
