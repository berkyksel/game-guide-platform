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

  const popularGames = [
    {
      name: "Minecraft",
      engine: "Java / Unity",
      icon: "⛏️",
    },
    {
      name: "Hollow Knight",
      engine: "Unity",
      icon: "🗡️",
    },
    {
      name: "Terraria",
      engine: "XNA",
      icon: "🌳",
    },
    {
      name: "Stardew Valley",
      engine: "MonoGame",
      icon: "🌾",
    },
    {
      name: "Celeste",
      engine: "MonoGame",
      icon: "🏔️",
    },
    {
      name: "Among Us",
      engine: "Unity",
      icon: "🚀",
    },
  ];

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

      <main className="bg-black text-white">

        {/* Hero Section */}
        <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">

          <span className="rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-gray-300">
            🚀 AI Powered Game Development
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">
            Build Any Game
            <br />
            <span className="text-gray-400">
              Step by Step with AI
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-400">
            Enter any game name and receive a complete development guide
            including mechanics, architecture, folder structure,
            recommended engine and programming roadmap.
          </p>

          <div className="mt-10 flex gap-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200"
            >
              Start Generating
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-black hover:bg-gray-200"
            >
              Explore Games
            </Button>
          </div>

        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              How It Works
            </h2>

            <p className="mt-4 text-gray-400">
              Create complete game development guides in three simple steps.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:border-gray-600">

              <div className="mb-6 text-5xl">
                🎮
              </div>

              <h3 className="text-2xl font-semibold">
                Enter a Game
              </h3>

              <p className="mt-4 text-gray-400">
                Type the name of any game you want to recreate or learn from.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:border-gray-600">

              <div className="mb-6 text-5xl">
                🤖
              </div>

              <h3 className="text-2xl font-semibold">
                AI Analysis
              </h3>

              <p className="mt-4 text-gray-400">
                AI analyzes gameplay mechanics, architecture, art style and engine.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition hover:border-gray-600">

              <div className="mb-6 text-5xl">
                🚀
              </div>

              <h3 className="text-2xl font-semibold">
                Build Your Game
              </h3>

              <p className="mt-4 text-gray-400">
                Receive a complete roadmap with code examples and development steps.
              </p>

            </div>

          </div>

        </section>

        {/* Popular Games */}
        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Popular Games
            </h2>

            <p className="mt-4 text-gray-400">
              Click any game to instantly generate its development guide.
            </p>

          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {popularGames.map((game) => (

              <button
                key={game.name}
                onClick={() => setInput(game.name)}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-gray-800"
              >

                <div className="text-5xl">
                  {game.icon}
                </div>

                <h3 className="mt-5 text-2xl font-semibold">
                  {game.name}
                </h3>

                <p className="mt-2 text-gray-400">
                  Engine
                </p>

                <span className="mt-3 inline-block rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                  {game.engine}
                </span>

              </button>

            ))}

          </div>

        </section>

        {/* Supported Engines */}
        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Supported Game Engines
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Generate development guides for the most popular game engines.
              Learn the best practices, architecture and workflows for each one.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {/* Unity */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-white">

              <div className="text-5xl">
                🎮
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Unity
              </h3>

              <p className="mt-4 text-gray-400">
                Perfect for 2D and 3D games.
                Great documentation and one of the largest communities.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  C#
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  2D
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  3D
                </span>
              </div>

            </div>

            {/* Unreal */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-white">

              <div className="text-5xl">
                ⚡
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Unreal Engine
              </h3>

              <p className="mt-4 text-gray-400">
                AAA graphics with Blueprint and C++.
                Ideal for realistic games and advanced visual effects.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  Blueprint
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  C++
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  AAA
                </span>
              </div>

            </div>

            {/* Godot */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 transition duration-300 hover:-translate-y-1 hover:border-white">

              <div className="text-5xl">
                🚀
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Godot
              </h3>

              <p className="mt-4 text-gray-400">
                Lightweight, open-source and beginner friendly.
                Excellent choice for indie developers.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  GDScript
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  Open Source
                </span>

                <span className="rounded-full bg-gray-800 px-3 py-1 text-sm">
                  Indie
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* Chat Section */}
        <div className="mb-10 text-center">

          <h2 className="text-4xl font-bold">
            AI Guide Generator
          </h2>

          <p className="mt-4 text-gray-400">
            Enter a game name and let AI create a complete development guide.
          </p>

        </div>
        <section className="mx-auto mb-20 w-full max-w-3xl px-6">

          {messages.length > 0 && (
            <Card className="mb-4 border-gray-700 bg-gray-900 p-4">
              <ScrollArea className="h-64">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${message.role === 'user'
                      ? 'text-right'
                      : 'text-left'
                      }`}
                  >
                    <span
                      className={`inline-block rounded px-3 py-1 ${message.role === 'user'
                        ? 'bg-white text-black'
                        : 'bg-gray-700 text-white'
                        }`}
                    >
                      {message.content}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            </Card>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex gap-3"
          >

            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Minecraft"
              className="h-14 flex-grow rounded-xl border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="h-14 rounded-xl bg-white px-8 text-black hover:bg-gray-200"
            >
              {isLoading ? "Generating..." : "Generate"}
            </Button>

          </form>

        </section>

        <Footer />

      </main>
    </>
  );


}
