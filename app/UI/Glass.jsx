export default function Glass({children, className}){
    return(
        <div
            className="rounded-3xl"
            style={{
                background:
                    'linear-gradient(135deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.20) 50%, rgba(0,0,0,0.40) 100%)',
            }}
        >
            <div className={`bg-white/5 backdrop-blur-3xl [-webkit-backdrop-filter:blur(64px)] ${className}`}>
                {children}
            </div>
        </div>
    )
}