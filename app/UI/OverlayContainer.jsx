export default function OverlayContainer({children, className}){
    return(
        <div className={`[background:radial-gradient(ellipse_at_center,#561c25_0%,#2b0e13_100%)] mr-5 text-foreground shadow-lg p-8 md:p-10 lg:p-8 2xl:p-8 min-w-[90vw] max-w-[99vw] md:min-w-[50vw] md:max-w-[50vw] lg:max-w-[30vw] lg:min-w-[30vw] rounded-3xl ${className || ''}`}>
            {children}
        </div>
    )
}
