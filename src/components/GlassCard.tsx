import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card--hover' : ''} ${className}`}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
      onClick={onClick}
    >
      <div className="glass-card__glow" />
      <div className="glass-card__content">
        {children}
      </div>
    </motion.div>
  );
}
