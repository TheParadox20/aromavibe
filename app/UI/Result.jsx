import { useState } from "react";
import Glass from "@/app/UI/Glass";
import { eliminate } from "@/app/UI/Matrix";
import { useEffect } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function Result({ control, answers }) {
    const options = eliminate(answers);
    const [picked] = useState(
        () => options[Math.floor(Math.random() * options.length)]
    );

    useEffect(()=>{
        fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                suggestions: options, 
                final_suggestion: picked,
                answers: answers
            }),
        })
        .then(res=>res.json)
        .then(dataa=>{
            console.log(dataa.insertedId);
        })
    },[])

    return (
        <div className="mr-5">
            <Glass className="flex flex-col items-center lg:p-4 2xl:p-3 w-fit max-w-[90vw] md:max-w-[34vw] rounded-3xl mx-auto text-white">

                {/* Perfume image */}
                <div className="relative md:-mt-80 lg:-mt-44 2xl:-mt-68">
                    <div className="flex items-center justify-center">
                        <img
                            src={picked.image}
                            alt={picked.name}
                            className="max-w-[28rem] max-h-[28rem] md:max-w-lg md:max-h-lg lg:max-w-xs lg:max-h-xs 2xl:max-w-lg 2xl:max-h-lg object-contain drop-shadow-xl"
                        />
                    </div>
                    <div className="-mt-16 lg:-mt-10 2xl:-mt-16 text-center">
                        {/* Now Playing eyebrow with EQ bars */}
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="flex items-end gap-[2px] h-3">
                                {[0, 1, 2, 3].map(b => (
                                    <span
                                        key={b}
                                        className="w-[3px] bg-white/80 rounded-full animate-eq"
                                        style={{ height: '100%', animationDelay: `${b * 120}ms` }}
                                    />
                                ))}
                            </div>
                            <p className="uppercase text-xs lg:text-[0.5rem] 2xl:text-xs font-semibold tracking-[0.25em]">
                                Now playing
                            </p>
                        </div>
                        <p className="lg:text-2xl 2xl:text-[2.5rem] uppercase font-light tracking-wider">
                            {picked.name}
                        </p>
                        <p className="uppercase text-xs lg:text-[0.5rem] 2xl:text-xs tracking-[0.2em] text-white/60 mt-1">
                            Aroma Vibe{picked.category ? ` · ${picked.category}` : ''} · Eau de Parfum
                        </p>
                    </div>
                </div>

                {/* Seek bar */}
                <div className="w-full max-w-72 mt-6 px-2">
                    <div className="relative h-[3px] rounded-full bg-white/15">
                        <div className="absolute inset-y-0 left-0 w-[68%] rounded-full bg-white" />
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-[68%] w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                    <div className="flex justify-between mt-1.5 text-[0.6rem] tracking-widest text-white/40 tabular-nums">
                        <span>1:42</span>
                        <span>-0:48</span>
                    </div>
                </div>

                {/* Tracklist — the notes */}
                {picked.notesList && (
                    <p className="text-center text-xs lg:text-[0.6rem] 2xl:text-xs text-white/45 leading-relaxed mt-4 mb-2 max-w-72 tracking-wide">
                        {picked.notesList}
                    </p>
                )}

                {/* Answer summary pills */}
                <div className="flex flex-wrap gap-2 justify-center mt-3 mb-7 md:max-w-72">
                    {Object.values(answers).map((val, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white/60 text-xs lg:text-[0.5rem] 2xl:text-xs tracking-widest uppercase"
                        >
                            {val.replace(/-/g, ' ')}
                        </span>
                    ))}
                </div>

                <a
                    href={picked.link}
                    target="_blank"
                    className="bg-white w-fit self-center py-2.5 px-10 rounded-full text-sm lg:text-xs 2xl:text-sm text-black font-medium tracking-[0.2em] uppercase hover:cursor-pointer hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 mb-4 flex items-center gap-2.5"
                >
                    <Play size={15} strokeWidth={2.4} fill="currentColor" />
                    Shop this vibe
                </a>

                <button
                    onClick={() => control('intro')}
                    className="text-white/50 text-xs tracking-widest uppercase hover:text-white/70 transition-colors duration-200 cursor-pointer mb-7 md:mb-1 flex items-center gap-2"
                >
                    <RotateCcw size={13} strokeWidth={2.2} />
                    Replay
                </button>
                </Glass>
        </div>
    );
}
