"use client";

import { useState } from "react";
import { Coffee, Sparkles, Car, Mountain, Wine, Music } from "lucide-react";
import QuestionBase from "@/app/UI/QuestionBase";

// Youthful occasions → new `occasion` field on each fragrance
const OCCASIONS = [
    { id: 'brunch',     icon: Coffee,   label: 'Brunch & Day Dates', sublabel: 'Sunlit, easy, golden-hour energy' },
    { id: 'clubbing',   icon: Sparkles, label: 'Night Out',          sublabel: 'Lights low, music loud' },
    { id: 'road-trip',  icon: Car,      label: 'Road Trip',          sublabel: 'Windows down, open road' },
    { id: 'hiking',     icon: Mountain, label: 'Hiking & Outdoors',  sublabel: 'Fresh air, off the grid' },
    { id: 'date-night', icon: Wine,     label: 'Date Night',         sublabel: 'Close, intimate, unforgettable' },
    { id: 'festival',   icon: Music,    label: 'Festival & Concerts', sublabel: 'Crowd, bass, pure adrenaline' },
];

export default function Occasion({ control, initial }) {
    const [selected, setSelected] = useState(initial ?? null);

    return (
        <QuestionBase
            step={4}
            label="Set the Scene"
            title="Where's it playing?"
            canContinue={!!selected}
            onNext={() => control('result', { occasion: selected })}
            onBack={() => control('vibe')}
        >
            <div className="grid grid-cols-2 gap-2.5">
                {OCCASIONS.map(o => {
                    const Icon = o.icon;
                    const isSelected = selected === o.id;
                    return (
                        <button
                            key={o.id}
                            onClick={() => setSelected(o.id)}
                            className={`flex flex-col items-start gap-2.5 p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-250 group active:scale-[0.97] ${
                                isSelected
                                    ? 'bg-white/[0.11] border-white/35 scale-[1.02]'
                                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20'
                            }`}
                        >
                            <span className={`w-9 h-9 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${
                                isSelected ? 'bg-white text-black scale-110' : 'bg-white/[0.06] text-white/45 group-hover:bg-white/12 group-hover:text-white/70'
                            }`}>
                                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
                            </span>
                            <div className="min-w-0">
                                <p className={`font-medium text-sm lg:text-xs 2xl:text-sm leading-tight ${isSelected ? 'text-white' : 'text-white/65 group-hover:text-white/85'}`}>
                                    {o.label}
                                </p>
                                <p className={`text-xs lg:text-[0.6rem] 2xl:text-xs mt-1 leading-snug ${isSelected ? 'text-white/45' : 'text-white/25'}`}>
                                    {o.sublabel}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </QuestionBase>
    );
}
