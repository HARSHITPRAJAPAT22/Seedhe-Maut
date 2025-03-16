export function Card() {
    return (
        <div className="bg-black/30 p-4 rounded-2xl shadow-lg w-80 border-4 border-stone-700">
            {/* Image with black border */}
            <div className="border-4 border-red-700 rounded-lg overflow-hidden">
                <img 
                    src="img.png" 
                    alt="Card Image" 
                    className="w-full h-40 object-cover"
                />
            </div>

            {/* Card Content */}
            <div className="text-white text-center mt-4">
                <h2 className="text-xl font-semibold">Seedhe Maut</h2>
                <p className="text-gray-300 mt-2 bg-gradient-to-r from-red-600 via-rose-500 to-red-400 text-transparent bg-clip-text">
                    A hard-hitting hip-hop duo redefining Indian rap with raw lyrics and high-energy flows.
                </p>
            </div>
        </div>
    );
}
