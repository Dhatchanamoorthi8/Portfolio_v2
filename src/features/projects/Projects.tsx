import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import GlassCard from '../../components/GlassCard';
import TechBadge from '../../components/TechBadge';
import { projects } from '../../data/portfolio';
import { ChevronRight, X, Layers, Zap, Bot } from 'lucide-react';

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'enterprise', label: 'Enterprise' },
  { key: 'ai', label: 'AI' },
  { key: 'iot', label: 'IoT' },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const expanded = projects.find((p) => p.id === expandedProject);

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeader
          tag="Featured Projects"
          title="What I've Built"
          subtitle="Enterprise applications, AI solutions, and IoT systems — all production-grade."
        />

        <ScrollReveal>
          <div className="projects__filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`projects__filter ${activeFilter === f.key ? 'projects__filter--active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div className="projects__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <GlassCard
                  className="project-card"
                  onClick={() => setExpandedProject(project.id)}
                >
                  <div className={`project-card__category project-card__category--${project.category}`}>
                    {project.category === 'enterprise' ? <Layers size={14} /> : <Zap size={14} />}
                    {project.category}
                  </div>
                  {project.aiTools && project.aiTools.length > 0 && (
                    <div className="project-card__ai-badge">
                      <Bot size={12} />
                      <span>Built with AI</span>
                      <div className="project-card__ai-badge-shimmer" />
                    </div>
                  )}
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__subtitle">{project.subtitle}</p>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__features">
                    {project.features.slice(0, 4).map((f) => (
                      <div key={f} className="project-card__feature">
                        <ChevronRight size={12} />
                        {f}
                      </div>
                    ))}
                    {project.features.length > 4 && (
                      <div className="project-card__more">+{project.features.length - 4} more</div>
                    )}
                  </div>

                  {project.metrics && (
                    <div className="project-card__metrics">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="project-card__metric">
                          <span className="project-card__metric-value">{m.value}</span>
                          <span className="project-card__metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="project-card__tech">
                    {project.techStack.map((t) => (
                      <TechBadge key={t} name={t} size="sm" />
                    ))}
                  </div>

                  <div className="project-card__action">
                    View Architecture
                    <ChevronRight size={14} />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Expanded Project Detail Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="project-modal__backdrop"
              onClick={() => setExpandedProject(null)}
            />
            <motion.div
              className="project-modal__content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                className="project-modal__close"
                onClick={() => setExpandedProject(null)}
              >
                <X size={24} />
              </button>

              <div className="project-modal__header">
                <h2>{expanded.title}</h2>
                <p>{expanded.description}</p>
              </div>

              <div className="project-modal__section">
                <h4>Architecture Flow</h4>
                <div className="project-modal__arch">
                  {expanded.architectureNodes?.map((node, i) => (
                    <div key={i} className="project-modal__arch-node">
                      <motion.div
                        className="project-modal__arch-box"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <div className="project-modal__arch-label">{node.label}</div>
                        <div className="project-modal__arch-desc">{node.description}</div>
                      </motion.div>
                      {i < (expanded.architectureNodes?.length ?? 0) - 1 && (
                        <motion.div
                          className="project-modal__arch-arrow"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.15 + 0.1 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-modal__section">
                <h4>Key Features</h4>
                <div className="project-modal__features">
                  {expanded.features.map((f) => (
                    <div key={f} className="project-modal__feature">
                      <ChevronRight size={14} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="project-modal__section">
                <h4>Tech Stack</h4>
                <div className="project-modal__tech">
                  {expanded.techStack.map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
