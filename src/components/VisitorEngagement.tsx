import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';

const milestones = [
  { time: 30, message: "You're exploring! 👀", emoji: '🔍' },
  { time: 60, message: '1 minute deep! 🎯', emoji: '🎉' },
  { time: 120, message: '2 minutes in! You like what you see?', emoji: '🔥' },
  { time: 180, message: '3 min! Let\'s connect!', emoji: '🚀' },
];

export default function VisitorEngagement() {
  const [seconds, setSeconds] = useState(0);
  const [visible, setVisible] = useState(false);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show after 8 seconds
  useEffect(() => {
    if (seconds >= 8 && !dismissed) {
      setVisible(true);
    }
  }, [seconds, dismissed]);

  // Show milestones
  useEffect(() => {
    const m = milestones.find((m) => m.time === seconds);
    if (m) {
      setMilestone(`${m.emoji} ${m.message}`);
      setTimeout(() => setMilestone(null), 3500);
    }
  }, [seconds]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    if (mins > 0) return `${mins}m ${secs.toString().padStart(2, '0')}s`;
    return `${secs}s`;
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="visitor-engagement"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        >
          <AnimatePresence mode="wait">
            {milestone ? (
              <motion.div
                key="milestone"
                className="visitor-engagement__milestone"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Sparkles size={14} />
                <span>{milestone}</span>
              </motion.div>
            ) : (
              <motion.div
                key="timer"
                className="visitor-engagement__timer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Clock size={13} />
                <span>{formatTime(seconds)} exploring</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="visitor-engagement__close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
