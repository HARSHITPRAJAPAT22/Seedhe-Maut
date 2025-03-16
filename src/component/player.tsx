import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, StopCircle, Volume2 } from "lucide-react";

// Custom Button Component
//@ts-ignore
function MyButton({ onClick, icon }) {
    return (
        <button 
            className="bg-red-700 p-3 rounded-full hover:bg-red-600 transition-all"
            onClick={onClick}
        >
            {icon}
        </button>
    );
}

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [selectedSong, setSelectedSong] = useState<string>("");
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1); // Default volume at 100%

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // 🎵 Stored Songs
    const songs = [
        { 
            name: "Seedhe Maut - TT / Shutdown", 
            url: "/videoplayback.m4a", 
            imgSrc: "/tt.jpeg" // ✅ Use this for album cover
        },{
            name : "Hola Amigo",
            url : '/Hola Amigo.mp3'
        },
        {
            name : "Khatta Flow",
            url : '/Khattaflow.mp3'
        },{
            name : "Maina",
            url : '/Maina.mp3'
        },{
            name : "Marne ke Baad Bhi",
            url : '/Marne Ke Baad Bhi.mp3'
        },{
            name : "नalla Freestyle",
            url : "/nalla.mp3"
        },{
            name : "Nanchaku",
            url : "/Nanchaku.mp3"
        },{
            name : "Teen Dost",
            url : "/Teen Dost.mp3"
        }
    ];

    // Find selected song object
    const selectedSongData = songs.find(song => song.url === selectedSong);

    // 🔄 Update song selection
    const handleSongChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const songUrl = event.target.value;
        setAudioSrc(songUrl);
        setSelectedSong(songUrl);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    // ▶️ Play / Pause Toggle
    const togglePlayPause = () => {
        if (audioRef.current && audioSrc) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // ⏩ Skip Forward
    const skipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime += 10;
        }
    };

    // ⏪ Skip Backward
    const skipBackward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime -= 10;
        }
    };

    // 🛑 Stop Playback
    const stopPlayback = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    // 🔊 Update Progress Bar
    const updateProgress = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    // 🔘 Seek to position in song
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value);
            setCurrentTime(Number(event.target.value));
        }
    };

    // 🎚 Adjust Volume
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const volumeLevel = Number(event.target.value);
            audioRef.current.volume = volumeLevel;
            setVolume(volumeLevel);
        }
    };

    // 🔄 Update current time as song plays
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener("timeupdate", updateProgress);
            audio.addEventListener("loadedmetadata", updateProgress);
        }
        return () => {
            if (audio) {
                audio.removeEventListener("timeupdate", updateProgress);
                audio.removeEventListener("loadedmetadata", updateProgress);
            }
        };
    }, []);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(200,50,50,0.5),rgba(255,255,255,0))]">
            <div className="bg-black/30 p-4 rounded-2xl shadow-lg w-80 border-4 border-stone-700">
                
                {/* 🎵 Dynamic Album Cover */}
                <div className="border-4 border-red-700 rounded-lg overflow-hidden">
                    <img 
                        src={selectedSongData?.imgSrc || "/img.png"} // ✅ Use song image or default
                        alt="Album Cover" 
                        className="w-full h-40 object-cover"
                    />
                </div>

                {/* 🔽 Song Selector Dropdown */}
                <div className="text-white text-center mt-4">
                    <h2 className="text-xl font-semibold">Stored Songs Player</h2>
                    <select 
                        className="mt-2 p-2 bg-gray-800 text-white rounded-md w-full"
                        value={selectedSong} 
                        onChange={handleSongChange}
                    >
                        <option value="">Select a song</option>
                        {songs.map((song, index) => (
                            <option key={index} value={song.url}>{song.name}</option>
                        ))}
                    </select>
                </div>

                {/* 🎶 Music Player Controls */}
                <div className="text-white text-center mt-4">
                    <p className="text-gray-300 mt-2">
                        {audioSrc ? `Playing: ${selectedSongData?.name}` : "Select a song to play"}
                    </p>

                    {/* 🎧 Audio Element */}
                    <audio ref={audioRef} src={audioSrc || ""} />

                    {/* ⏳ Progress Bar */}
                    <div className="flex items-center gap-2 mt-2 text-gray-300">
                        <span className="text-xs">{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full"
                        />
                        <span className="text-xs">{formatTime(duration)}</span>
                    </div>

                    {/* 🎛 Volume Control */}
                    <div className="flex items-center gap-2 mt-2">
                        <Volume2 size={20} className="text-gray-300" />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-4">
                        <MyButton onClick={skipBackward} icon={<SkipBack size={24} />} />
                        <MyButton 
                            onClick={togglePlayPause} 
                            icon={isPlaying ? <Pause size={24} /> : <Play size={24} />} 
                        />
                        <MyButton onClick={skipForward} icon={<SkipForward size={24} />} />
                        <MyButton onClick={stopPlayback} icon={<StopCircle size={24} />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ⏳ Format time helper function
function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
