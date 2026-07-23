'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-800 bg-black">
            <div className="mx-auto max-w-7xl px-6 py-10">

                <div className="grid gap-10 md:grid-cols-3">

                    {/* Logo */}
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            🎮 Game Dev AI Guide
                        </h2>

                        <p className="mt-3 text-sm text-gray-400">
                            Your AI assistant for building games step by step.
                            Generate complete development guides for Unity,
                            Unreal Engine and Godot.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link href="#popular" className="hover:text-white">
                                    Popular Games
                                </Link>
                            </li>

                            <li>
                                <Link href="#genres" className="hover:text-white">
                                    Game Genres
                                </Link>
                            </li>

                            <li>
                                <Link href="#about" className="hover:text-white">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">
                            Built With
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {[
                                'Next.js',
                                'React',
                                'Tailwind',
                                'Node.js',
                                'OpenAI'
                            ].map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-sm text-gray-300"
                                >
                                    {tech}
                                </span>
                            ))}

                        </div>
                    </div>

                </div>

                {/* Alt Kısım */}
                <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
                    © 2026 Game Dev AI Guide. All rights reserved.
                </div>

            </div>
        </footer>
    );
}