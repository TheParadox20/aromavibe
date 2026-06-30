export default function Card({children, className}){
    return(
        <div className={`bg-white text-black p-10 rounded-2xl ${className}`}>
            {children}
        </div>
    )
}