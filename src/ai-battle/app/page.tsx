'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ top: '60%', right: '10%', animationDelay: '1s' }} />
        <div className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '50%', animationDelay: '2s' }} />
      </div>

      {/* Mouse glow effect */}
      <div
        className="fixed w-96 h-96 bg-red-400/5 rounded-full blur-3xl pointer-events-none"
        style={{
          top: mousePosition.y - 192,
          left: mousePosition.x - 192,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Logo/Title section */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <div className="text-6xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  MARS
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  ROVER
                </span>
              </div>
            </div>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explora el planeta rojo con nuestro simulador interactivo de rover. Controla su movimiento, evita obstáculos y domina el arte de la navegación marciana en tiempo real.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
            {[
              { icon: '🚀', title: 'Simulación Real', desc: 'Física realista de movimiento en Marte' },
              { icon: '🎮', title: 'Control Total', desc: 'Interfaz intuitiva y fluida' },
              { icon: '📊', title: '100% Testeado', desc: '95 tests de integración' },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-12">
            <Link href="/mars-rover" className="inline-block group">
              <button className="relative px-8 py-4 text-lg font-bold text-white rounded-full overflow-hidden group transition-all duration-300">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 group-hover:from-red-500 group-hover:via-orange-400 group-hover:to-yellow-400 transition-all duration-300" />

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity duration-300" />

                {/* Animated border */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-400 to-orange-400 -inset-0.5 blur opacity-0 group-hover:opacity-30 -z-10 transition-opacity duration-300" />

                <span className="relative flex items-center justify-center gap-2">
                  🚀 Comenzar Simulación
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </Link>

            <p className="text-sm text-gray-500">
              Construido con TypeScript • TDD • React • Next.js
            </p>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/10">
            {[
              { number: '95', label: 'Tests' },
              { number: '100%', label: 'Cobertura' },
              { number: '9', label: 'Fases' },
              { number: '4', label: 'Comandos' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
