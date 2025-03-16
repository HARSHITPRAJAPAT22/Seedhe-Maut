import '../App.css'
export function Button() {
    return (
        <div>
            <div className='glow-on-hover'>
            <img 
            src="public/bat3.png" 
            alt="Bat Icon"
            className="object-contain h-20 transition-all duration-300 hover:brightness-75 hover:grayscale hover:hue-rotate-[-50deg] hover:scale-110"/>
            </div>
            <div className="text-center mt-4 bg-gradient-to-r from-red-600 via-rose-500 to-red-400 text-transparent bg-clip-text">
                <p className="text-xl font-semibold font-mono">
                    Let's Play!
                </p>
            </div>
        </div>
    );
}
