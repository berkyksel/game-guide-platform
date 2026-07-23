'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-800 bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🎮</span>
                    <span className="text-xl font-bold text-white">
                        Game Dev AI Guide
                    </span>
                </Link>

                {/* Menü */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Home
                    </Link>

                    <Link
                        href="#popular"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Popular Games
                    </Link>

                    <Link
                        href="#genres"
                        className="text-gray-300 transition hover:text-white"
                    >
                        Genres
                    </Link>

                    <Link
                        href="#about"
                        className="text-gray-300 transition hover:text-white"
                    >
                        About
                    </Link>
                </div>

                {/* Sağ Buton */}
                <Button className="bg-white text-black hover:bg-gray-200">
                    Get Started
                </Button>

            </div>
        </nav>
    );
}