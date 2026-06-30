"use client";
import { useState } from "react";
import Glass from "@/app/UI/Glass";

const RINGS = [
  {
    words: ['Fresh', 'Woody', 'Spicy', 'Floral', 'Musky', 'Citrus', 'Sweet'],
    radius: 120,
    duration: '14s',
    direction: 'normal',
  },
  {
    words: ['Gourmand', 'Aquatic', 'Earthy', 'Powdery', 'Smoky', 'Leather', 'Amber', 'Vanilla', 'Sandalwood'],
    radius: 250,
    duration: '25s',
    direction: 'reverse', // anticlockwise
  },
  {
    words: ['Bergamot', 'Vetiver', 'Oud', 'Jasmine', 'Rose', 'Neroli', 'Patchouli', 'Cedarwood', 'Cardamom', 'Musk', 'Iris'],
    radius: 390,
    duration: '28s',
    direction: 'normal',
  },
];

export default function Choices({ control }) {
  const [selected, setSelected] = useState([]);

  const toggle = (word) => {
    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word));
    } else if (selected.length < 3) {
      setSelected([...selected, word]);
    }
  };

  return (
    <div className="min-h-screen text-white px-8">

      {/* Logo */}
      <div className="flex items-center justify-center py-10">
        <img src="/logo.png" alt="Aroma Vibe" className="w-full max-w-md" />
      </div>

      <section className="flex justify-between items-center mt-12 gap-8">

        {/* Rings */}
        <div className="relative flex-1 flex items-center justify-center" style={{ height: '680px' }}>

          {/* Decorative orbit rings */}
          {RINGS.map((ring, ri) => (
            <div
              key={ri}
              className="absolute rounded-full border border-white/[0.06]"
              style={{ width: ring.radius * 2 + 80, height: ring.radius * 2 + 80 }}
            />
          ))}

          {/* Center glow */}
          <div className="absolute w-24 h-24 rounded-full bg-white/5 blur-xl" />
          <div className="absolute w-3 h-3 rounded-full bg-white/30" />

          {/* Each ring */}
          {RINGS.map((ring, ri) => (
            <div
              key={ri}
              className="absolute"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                animation: `spin-wheel ${ring.duration} linear infinite ${ring.direction}`,
              }}
            >
              {ring.words.map((word, wi) => {
                const angleDeg = (360 / ring.words.length) * wi - 90;
                const rad = angleDeg * (Math.PI / 180);
                const x = Math.cos(rad) * ring.radius;
                const y = Math.sin(rad) * ring.radius;
                const isSelected = selected.includes(word);

                // counter-rotate to keep labels upright
                // if the ring goes reverse, the counter-rotation goes normal, and vice versa
                const counterDir = ring.direction === 'reverse' ? 'normal' : 'reverse';

                return (
                  <button
                    key={wi}
                    onClick={() => toggle(word)}
                    disabled={!isSelected && selected.length >= 3}
                    className={`
                      absolute -translate-x-1/2 -translate-y-1/2
                      px-3 py-1.5 rounded-full tracking-widest uppercase
                      border transition-all duration-300 cursor-pointer whitespace-nowrap
                      font-medium text-lg
                      ${isSelected
                        ? 'bg-white/20 border-white/60 text-white scale-110 shadow-[0_0_14px_rgba(255,255,255,0.35)]'
                        : 'bg-white/5 border-white/15 text-white/55 hover:bg-white/10 hover:border-white/30 hover:text-white/90 disabled:opacity-30 disabled:cursor-not-allowed'
                      }
                    `}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animation: `spin-wheel ${ring.duration} linear infinite ${counterDir}`,
                    }}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Glass panel */}
        <Glass className="w-96 max-w-[30vw] min-h-96 rounded-2xl text-white flex flex-col justify-between p-8">
          <p className="text-center text-xl font-medium tracking-wider leading-relaxed text-white/80">
            Select <span className="text-white font-semibold">3 words</span> that best describe your fragrance
          </p>

          <div className="flex flex-col gap-3 mt-8">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`
                  h-12 rounded-xl border flex items-center justify-center
                  text-sm tracking-widest uppercase font-medium transition-all duration-300
                  ${selected[i]
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-white/10 bg-white/5 text-white/20'
                  }
                `}
              >
                {selected[i] ?? <span className="text-white/15">— choice {i + 1} —</span>}
              </div>
            ))}
          </div>

          <button
            onClick={() => control?.(selected)}
            disabled={selected.length < 3}
            className={`
              mt-8 w-full py-3 rounded-xl text-sm tracking-widest uppercase font-medium
              border transition-all duration-300
              ${selected.length === 3
                ? 'bg-white text-black border-white hover:bg-white/90 cursor-pointer'
                : 'bg-white/5 text-white/20 border-white/10 cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        </Glass>
      </section>

      <style jsx>{`
        @keyframes spin-wheel {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}