'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const GREETINGS = [
  "வணக்கம்",     // Tamil
  "స్వాగతం",    // Telugu
  "ಸ್ವಾಗತ",      // Kannada
  "స్వాగతం",    // Malayalam script / phonetic variant
  "नमस्ते",      // Hindi
  "Welcome"     // English
];

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Cycle through greetings rapidly
    if (index < GREETINGS.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 240); // speed of text transition
      return () => clearTimeout(timeout);
    } else {
      // Pause on final greeting ("Welcome") briefly, then trigger exit
      const exitTimeout = setTimeout(() => {
        setIsFinished(true);
      }, 700);
      return () => clearTimeout(exitTimeout);
    }
  }, [index]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Subtle central ambient glow */}
          <div
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              background: 'rgba(234, 179, 8, 0.12)',
              filter: 'blur(120px)',
              borderRadius: '50%'
            }}
          />

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.18 }}
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              zIndex: 10,
              textAlign: 'center'
            }}
          >
            {GREETINGS[index]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
