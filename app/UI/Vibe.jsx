"use client";

import { useState } from "react";
import { Play, Pause, Rewind, FastForward, SkipForward, Circle } from "lucide-react";
import QuestionBase from "@/app/UI/QuestionBase";

// The 6 transport vibes → new `vibe` field on each fragrance
const VIBES = [
    { id: 'play',         icon: Play,        label: 'Live in the Moment', sublabel: 'Present, spontaneous, pure joy' },
    { id: 'pause',        icon: Pause,       label: 'Pause & Take it in',  sublabel: 'Calm, grateful, contemplative' },
    { id: 'rewind',       icon: Rewind,      label: 'Nostalgia',           sublabel: 'Warm, sentimental, cherished' },
    { id: 'fast-forward', icon: FastForward, label: 'Up & Go',             sublabel: 'Driven, on the move, go-getter' },
    { id: 'next',         icon: SkipForward, label: 'Explorer',            sublabel: 'Curious, adventurous, seeking new' },
    { id: 'record',       icon: Circle,      label: 'Creator',             sublabel: 'Expressive, building, leaving a mark' },
];

export default function Vibe({ control, initial }) {
    const [selected, setSelected] = useState(initial ?? null);

    return (
        <QuestionBase
            step={3}
            label="Set the Vibe"
            title="What's your vibe right now?"
            canContinue={!!selected}
            onNext={() => control('result', { vibe: selected })}
            onBack={() => control('volume')}
        >
            <div className="grid grid-cols-2 gap-2.5">
                {VIBES.map(v => {
                    const Icon = v.icon;
                    const isSelected = selected === v.id;
                    return (
                        <button
                            key={v.id}
                            onClick={() => setSelected(v.id)}
                            className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-250 group active:scale-[0.97] ${
                                isSelected
                                    ? 'bg-white/[0.11] border-white/35 scale-[1.02]'
                                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20'
                            }`}
                        >
                            <span className={`w-9 h-9 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${
                                isSelected ? 'bg-white text-black scale-110' : 'bg-white/[0.06] text-white/45 group-hover:bg-white/12 group-hover:text-white/70'
                            }`}>
                                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} fill={v.id === 'play' || v.id === 'record' ? 'currentColor' : 'none'} />
                            </span>
                            <div className="min-w-0">
                                <p className={`font-medium text-sm lg:text-xs 2xl:text-sm leading-tight ${isSelected ? 'text-white' : 'text-white/65 group-hover:text-white/85'}`}>
                                    {v.label}
                                </p>
                                <p className={`text-xs lg:text-[0.6rem] 2xl:text-xs mt-1 leading-snug ${isSelected ? 'text-white/45' : 'text-white/25'}`}>
                                    {v.sublabel}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </QuestionBase>
    );
}
