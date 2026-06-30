export default function OptionRow({ icon: Icon, label, sublabel, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left w-full cursor-pointer transition-all duration-250 my-[0.25rem] group active:scale-[0.98] ${
                selected
                    ? 'bg-white/[0.11] border-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.2)] scale-[1.01]'
                    : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/20 hover:scale-[1.005]'
            }`}
        >
            {/* Icon bubble */}
            <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                selected ? 'bg-white/15 text-white scale-110' : 'bg-white/[0.06] text-white/40 group-hover:bg-white/10 group-hover:text-white/60'
            }`}>
                {Icon && <Icon className="w-5 h-5" strokeWidth={2} />}
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <p className={`font-medium text-base lg:text-xs 2xl:text-base leading-snug transition-colors duration-200 ${
                    selected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                }`}>
                    {label}
                </p>
                {sublabel && (
                    <p className={`text-sm lg:text-[0.65rem] 2xl:text-sm mt-0.5 leading-snug transition-colors duration-200 ${
                        selected ? 'text-white/45' : 'text-white/25'
                    }`}>
                        {sublabel}
                    </p>
                )}
            </div>

            {/* Radio dot */}
            <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all duration-300 ${
                selected ? 'border-white bg-white' : 'border-white/20 bg-transparent'
            }`}>
                {selected && <div className="w-1.5 h-1.5 rounded-full bg-[#561C25]" />}
            </div>
        </button>
    );
}
