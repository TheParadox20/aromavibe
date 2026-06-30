"use client";

import { useState } from "react";
import { Volume as VolumeIcon, Volume1, Volume2 } from "lucide-react";
import QuestionBase from "@/app/UI/QuestionBase";

// 3 stops along the volume axis → existing `intensity` field
const LEVELS = [
    { id: 'whisper', icon: VolumeIcon, label: 'Laid Back',   sublabel: 'A quiet vibe, only noticed up close',   bars: 1 },
    { id: 'present', icon: Volume1,    label: 'In the Mix',  sublabel: 'Present, balanced, never overpowering',  bars: 2 },
    { id: 'bold',    icon: Volume2,    label: 'Own the Room', sublabel: 'Full presence that enters before you do', bars: 3 },
];

export default function Volume({ control, initial }) {
    const [selected, setSelected] = useState(initial ?? null);
    const activeIndex = LEVELS.findIndex(l => l.id === selected);

    return (
        <QuestionBase
            step={2}
            label="Volume / Projection"
            title="How loud should it play?"
            canContinue={!!selected}
            onNext={() => control('vibe', { intensity: selected })}
            onBack={() => control('who')}
        >
            <div className="flex flex-col gap-5">
                {/* Equalizer meter */}
                <div className="flex items-end justify-center gap-1.5 h-20 px-2">
                    {Array.from({ length: 14 }).map((_, i) => {
                        // light up bars proportional to selected level (0–3)
                        const lit = activeIndex >= 0 && i < ((activeIndex + 1) / LEVELS.length) * 14;
                        return (
                            <span
                                key={i}
                                className={`w-2 rounded-full transition-all duration-300 ${
                                    lit ? 'bg-white animate-eq' : 'bg-white/15'
                                }`}
                                style={{
                                    height: `${20 + (i % 5) * 12}%`,
                                    animationDelay: `${i * 70}ms`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Level buttons */}
                <div className="flex flex-col gap-2.5">
                    {LEVELS.map((lvl, i) => {
                        const Icon = lvl.icon;
                        const isSelected = selected === lvl.id;
                        return (
                            <button
                                key={lvl.id}
                                onClick={() => setSelected(lvl.id)}
                                className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left w-full cursor-pointer transition-all duration-250 group active:scale-[0.98] ${
                                    isSelected
                                        ? 'bg-white/[0.11] border-white/35 scale-[1.01]'
                                        : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20'
                                }`}
                            >
                                <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                                    isSelected ? 'bg-white/15 text-white scale-110' : 'bg-white/[0.06] text-white/40 group-hover:text-white/60'
                                }`}>
                                    <Icon className="w-5 h-5" strokeWidth={2} />
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className={`font-medium text-base lg:text-xs 2xl:text-base leading-snug ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                                        {lvl.label}
                                    </p>
                                    <p className={`text-sm lg:text-[0.65rem] 2xl:text-sm mt-0.5 leading-snug ${isSelected ? 'text-white/45' : 'text-white/25'}`}>
                                        {lvl.sublabel}
                                    </p>
                                </div>
                                {/* mini level indicator */}
                                <div className="flex items-end gap-0.5 h-4 shrink-0">
                                    {[0, 1, 2].map(b => (
                                        <span
                                            key={b}
                                            className={`w-1 rounded-full transition-all duration-300 ${b < lvl.bars && isSelected ? 'bg-white' : b < lvl.bars ? 'bg-white/30' : 'bg-white/10'}`}
                                            style={{ height: `${40 + b * 30}%` }}
                                        />
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </QuestionBase>
    );
}
