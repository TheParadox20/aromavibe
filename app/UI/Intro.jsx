import Glass from "@/app/UI/Glass";
import { Play } from "lucide-react";

export default function Intro({control}){
    return(
        <section className="mt-10 md:mt-0">
            <Glass className={`flex flex-col justify-center p-8 md:px-5 md:py-20 md w-fit max-w-[99vw] md:max-w-[50vw] lg:max-w-[30vw] 2xl:max-w-[25vw] rounded-2xl mx-auto text-white`}>
                <p className="animate-option text-center mb-2 uppercase tracking-widest text-white text-xs lg:text-[0.65rem] 2xl:text-xs" style={{ animationDelay: '100ms' }}>
                    you are such a vibe
                </p>
                {/* <div className="flex items-center justify-center mb-5">
                <img src="/white_logo.svg" alt="" className="w-32 h-32 -mt-36" />
                </div> */}
                <p className="uppercase lg:font-light 2xl:font-normal animate-option text-center text-2xl lg:text-2xl 2xl:text-2xl mb-7" style={{ animationDelay: '500ms' }}>
                    Find the fragrance that matches your vibe
                </p>
                <p className="animate-option text-center text-sm lg:text-xs 2xl:text-sm mb-10 font-medium text-white/70 md:max-w-96 mx-auto leading-relaxed" style={{ animationDelay: '700ms' }}>
                    Aroma Vibe is premium fragrance, made accessible — infused with natural oils and built for the young at heart. Press play and discover the scent that matches your vibe.
                </p>
                <button
                    onClick={() => control('who')}
                    aria-label="Press play to begin"
                    className="animate-option group w-20 h-20 self-center grid place-items-center rounded-full bg-white text-black hover:cursor-pointer hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:ring-4 hover:ring-white/20 hover:scale-110 ease-in-out"
                    style={{ animationDelay: '1580ms' }}
                >
                    <Play size={30} strokeWidth={2} fill="currentColor" className="ml-1 transition-transform duration-300 group-hover:scale-110" />
                </button>
                <p className="animate-option text-center mt-4 uppercase tracking-[0.25em] text-white/50 text-[0.6rem]" style={{ animationDelay: '1700ms' }}>
                    Press play
                </p>
            </Glass>
        </section>
    )
}
