'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <span className="text-2xl">🎮</span>

                    <span className="text-xl font-bold text-white">
                        Game Dev AI Guide
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-8 md:flex">

                    <a
                        href="#home"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Home
                    </a>

                    <a
                        href="#how-it-works"
                        className="text-gray-300 transition hover:text-white"
                    >
                        How It Works
                    </a>

                    <a
                        href="#popular"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Popular Games
                    </a>

                    <a
                        href="#engines"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Engines
                    </a>

                    <a
                        href="#generator"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Generator
                    </a>

                </div>

                {/* Right Button */}
                <Button
                    className="bg-white text-black hover:bg-gray-200"
                >
                    GitHub
                </Button>

            </div>
        </nav>
    );
}