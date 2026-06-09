import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { aiSkills } from '../../data/portfolio';
import { Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export default function AIEngineering() {
  return (
    <section id="ai-engineering" className="section">
      <div className="container">
        <SectionHeader
          tag="AI Engineering"
          title="AI-Powered Development"
          subtitle="Integrating artificial intelligence into real-world applications."
        />

        <div className="ai__grid">
          <ScrollReveal className="ai__current">
            <div className="ai__card-header">
              <Sparkles size={20} />
              <h3>Current AI Stack</h3>
            </div>
            <div className="ai__skills">
              {aiSkills.current.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="ai__skill ai__skill--active"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                >
                  <div className="ai__skill-dot ai__skill-dot--active" />
                  <span>{skill.name}</span>
                  <span className="ai__skill-status">Active</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="ai__roadmap">
            <div className="ai__card-header">
              <BookOpen size={20} />
              <h3>Learning Roadmap</h3>
            </div>
            <div className="ai__timeline">
              {aiSkills.roadmap.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className={`ai__skill ai__skill--${skill.status}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, x: -5 }}
                >
                  <ArrowRight size={14} className="ai__skill-arrow" />
                  <span>{skill.name}</span>
                  <span className={`ai__skill-status ai__skill-status--${skill.status}`}>
                    {skill.status === 'learning' ? 'In Progress' : 'Planned'}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
