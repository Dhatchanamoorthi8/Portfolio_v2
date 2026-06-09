import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { skillGroups } from '../../data/portfolio';
import { Monitor, Server, Database, Cloud, Brain } from 'lucide-react';

const iconMap: Record<string, typeof Monitor> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  cloud: Cloud,
  brain: Brain,
};

const levelColors: Record<string, string> = {
  expert: 'var(--accent)',
  advanced: 'var(--accent-secondary)',
  intermediate: 'var(--text-muted)',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <SectionHeader
          tag="Skills"
          title="Technical Expertise"
          subtitle="Technologies I use to build production systems — grouped by domain."
        />

        <ScrollReveal>
          <div className="skills__categories">
            {skillGroups.map((group, i) => {
              const Icon = iconMap[group.icon] || Monitor;
              return (
                <button
                  key={group.category}
                  className={`skills__category ${activeCategory === i ? 'skills__category--active' : ''}`}
                  onClick={() => setActiveCategory(i)}
                >
                  <Icon size={18} />
                  {group.category}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="skills__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {skillGroups[activeCategory].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className="skill-card__header">
                  <h4 className="skill-card__name">{skill.name}</h4>
                  <span
                    className="skill-card__level"
                    style={{ color: levelColors[skill.level] }}
                  >
                    {skill.level}
                  </span>
                </div>
                <div className="skill-card__projects">
                  {skill.projects.map((p) => (
                    <span key={p} className="skill-card__project">{p}</span>
                  ))}
                </div>
                <div className="skill-card__dots">
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={`skill-card__dot ${
                        (skill.level === 'expert' && dot <= 3) ||
                        (skill.level === 'advanced' && dot <= 2) ||
                        (skill.level === 'intermediate' && dot <= 1)
                          ? 'skill-card__dot--filled'
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
