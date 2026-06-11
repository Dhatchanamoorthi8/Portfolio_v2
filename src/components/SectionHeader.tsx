import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  tag?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ tag, title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`section-header ${align === 'center' ? 'section-header--center' : ''}`}>
      {tag && (
        <motion.span
          className="section-tag"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {tag}
        </motion.span>
      )}
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
