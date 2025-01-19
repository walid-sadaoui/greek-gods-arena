import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioContextType {
  volume: number;
  isMuted: boolean;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  const [isMuted, setIsMuted] = useState(
    localStorage.getItem("isMuted") === "true"
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSetVolume = (newVolume: number) => {
    setVolume(Math.max(0, Math.min(1, newVolume))); // Ensure volume is between 0 and 1
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(`/audio/background.mp3`);
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.loop = true;
      audioRef.current.play();
    }
  };
  useEffect(() => {
    playAudio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider
      value={{
        volume,
        isMuted,
        setVolume: handleSetVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
