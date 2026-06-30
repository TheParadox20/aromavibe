'use client';

import { useState } from "react";
import Intro     from "@/app/UI/Intro";
import Who       from "@/app/UI/Who";
import Volume    from "@/app/UI/Volume";
import Vibe      from "@/app/UI/Vibe";
import Result    from "@/app/UI/Result";
import Matrix    from "@/app/UI/Matrix";

export default function Home() {
    const [stage, setStage]     = useState('intro');
    const [answers, setAnswers] = useState({});

    const backgrounds = {
        intro:  '/backgrounds/savanna.webp',
        who:    '/backgrounds/who.jpg',
        volume: '/backgrounds/inferno-man.webp',
        vibe:   '/backgrounds/feeling.webp',
        result: '/backgrounds/reveal.jpg',
    };

    /** Moves to the next stage and merges any new answer data */
    const advance = (nextStage, answerData = {}) => {
        setAnswers(prev => ({ ...prev, ...answerData }));
        setStage(nextStage);
    };

    return (
        <main className="min-h-dvh bg-background relative">
            { stage !== 'intro' && <Matrix answers={answers} /> }

            {/* Background images — all stacked, crossfade via opacity transition */}
            <section className="fixed inset-0 z-0">
                {Object.keys(backgrounds).map((key) => (
                    <img
                        key={key}
                        src={backgrounds[key]}
                        alt={key}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${key === stage ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </section>

            {/* Dark scrim + scrollable content */}
            <section className="fixed inset-0 z-20 bg-black/30 overflow-y-auto flex flex-col">

                {/* Logo — always visible at the top */}
                <div className="flex items-center justify-center pt-7 pb-5 flex-shrink-0">
                    <div className="flex items-center justify-center gap-2 flex-col">
                        <img
                            src="/logo.png"
                            alt="Aroma Vibe"
                            className="w-52 max-w-xs"
                        />
                    </div>
                </div>

                {/* Stage content — keyed so each transition re-mounts and plays the entrance animation */}
                <div className="flex-1 flex items-start md:items-center justify-center py-4 pb-10 px-3">
                    <div key={stage} className={`animate-stage w-full flex items-center justify-center transition-all transform duration-500 ease-in-out ${stage == 'intro' ? 'md:justify-center' : 'md:justify-end'}`}>
                        {stage === 'intro'  && <Intro  control={advance} />}
                        {stage === 'who'    && <Who    control={advance} initial={answers.gender} />}
                        {stage === 'volume' && <Volume control={advance} initial={answers.intensity} />}
                        {stage === 'vibe'   && <Vibe   control={advance} initial={answers.vibe} />}
                        {stage === 'result' && <Result control={advance} answers={answers} />}
                    </div>
                </div>
            </section>
        </main>
    );
}
