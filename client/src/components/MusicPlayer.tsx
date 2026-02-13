import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2024/11/28/audio_3e54345a0b.mp3";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeAudio = useCallback(
    (target: number, duration = 600) => {
      const audio = audioRef.current;
      if (!audio) return;

      const steps = 20;
      const stepTime = duration / steps;
      const startVolume = audio.volume;
      const diff = target - startVolume;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        audio.volume = Math.max(
          0,
          Math.min(1, startVolume + (diff * step) / steps)
        );
        if (step >= steps) {
          clearInterval(interval);
          audio.volume = target;
        }
      }, stepTime);
    },
    []
  );

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasInteracted) {
      setHasInteracted(true);
    }

    if (isPlaying) {
      fadeAudio(0, 500);
      setTimeout(() => {
        audio.pause();
      }, 500);
      setIsPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        fadeAudio(0.3, 800);
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay - user needs to interact again
      });
    }
  }, [isPlaying, hasInteracted, fadeAudio]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center w-12 h-12 rounded-full oriental-border bg-card/80 backdrop-blur-md text-foreground transition-colors duration-300 hover:bg-card"
        aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 className="w-5 h-5 text-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sound wave animation rings */}
        {isPlaying && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/30"
              animate={{
                scale: [1, 1.5, 1.8],
                opacity: [0.4, 0.15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/20"
              animate={{
                scale: [1, 1.3, 1.6],
                opacity: [0.3, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
          </>
        )}
      </motion.button>

      {/* Tooltip hint on first load */}
      {!hasInteracted && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap"
        >
          <div className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm oriental-border text-xs font-arabic-ui text-muted-foreground">
            اضغط لتشغيل الموسيقى
          </div>
          <div className="w-2 h-2 bg-card/90 border-b border-r border-gold/20 rotate-45 mx-auto -mt-1" />
        </motion.div>
      )}
    </motion.div>
  );
}
