import { Children } from "react";
import { SkipBack, Play } from "lucide-react";
import OverlayContainer from "@/app/UI/OverlayContainer";

// Renders a fake track timestamp like 0:01 from a step index
const stamp = (s) => `0:${String(Math.max(0, s)).padStart(2, '0')}`;

export default function QuestionBase({ step, totalSteps = 3, label, title, children, onNext, canContinue, onBack }) {
    const progress = (step / totalSteps) * 100;

    return (
        <OverlayContainer>
            {/* Seek bar — animates in first */}
            <div className="animate-option" style={{ animationDelay: '30ms' }}>
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-white/50 text-[0.7rem] tracking-[0.12em] font-light shrink-0 tabular-nums">
                        {stamp(step)}
                    </span>
                    <div className="relative flex-1 h-[3px] rounded-full bg-white/[0.12] overflow-visible">
                        <div
                            className="absolute inset-y-0 left-0 rounded-full bg-white transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="animate-playhead absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white transition-all duration-700 ease-out"
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                    <span className="text-white/40 text-[0.7rem] tracking-[0.12em] font-light shrink-0 tabular-nums">
                        {stamp(totalSteps)}
                    </span>
                </div>
            </div>

            {/* Header — animates in second */}
            <div className="animate-option" style={{ animationDelay: '90ms' }}>
                <p className="text-white/90 mb-2 tracking-[0.28em] uppercase font-medium text-xs lg:text-[0.65rem]">{label}</p>
                <h2 className="text-2xl lg:text-[1.25rem] font-semibold text-white tracking-wide mb-7 leading-tight">{title}</h2>
            </div>

            {/* Options — staggered one by one */}
            <div className="flex flex-col gap2.5 mb-7">
                {Children.map(children, (child, i) => (
                    <div
                        key={i}
                        className="animate-option"
                        style={{ animationDelay: `${160 + i * 65}ms` }}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {/* Transport controls — animate in last */}
            <div
                className="animate-option flex items-center gap-3"
                style={{ animationDelay: `${160 + Children.count(children) * 65 + 40}ms` }}
            >
                {onBack && (
                    <button
                        onClick={onBack}
                        aria-label="Previous"
                        className="shrink-0 h-12 w-12 grid place-items-center rounded-full border border-white/[0.12] text-white/40 hover:text-white/70 hover:border-white/25 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        <SkipBack size={18} strokeWidth={2.4} fill="currentColor" />
                    </button>
                )}
                <button
                    onClick={onNext}
                    disabled={!canContinue}
                    className={`flex-1 h-12 rounded-full text-sm tracking-[0.2em] uppercase font-medium border transition-all duration-300 flex items-center justify-center gap-2.5 ${
                        canContinue
                            ? 'bg-white text-black border-white hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,255,255,0.18)] active:scale-[0.98] cursor-pointer'
                            : 'bg-white/[0.04] text-white/20 border-white/[0.08] cursor-not-allowed'
                    }`}
                >
                    <Play size={16} strokeWidth={2.4} fill="currentColor" />
                    {step >= totalSteps ? 'Reveal my vibe' : 'Continue'}
                </button>
            </div>
        </OverlayContainer>
    );
}
