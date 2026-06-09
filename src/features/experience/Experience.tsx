import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import GlassCard from '../../components/GlassCard';
import TechBadge from '../../components/TechBadge';
import { experience } from '../../data/portfolio';
import { CheckCircle, TrendingUp } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <SectionHeader
          tag="Experience"
          title="Enterprise SaaS Development"
          subtitle="Building production-grade applications that power business operations."
        />

        <ScrollReveal>
          <GlassCard className="experience__card" hover={false}>
            <div className="experience__header">
              <div>
                <h3 className="experience__role">{experience.role}</h3>
                <p className="experience__period">{experience.period} · Enterprise SaaS Development</p>
              </div>
              <div className="experience__badge">
                <TrendingUp size={16} />
                Production
              </div>
            </div>

            <div className="experience__achievements">
              {experience.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  className="experience__achievement"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CheckCircle size={16} className="experience__check" />
                  <div className="experience__achievement-content">
                    <span>{achievement.text}</span>
                    {achievement.metric && (
                      <span className="experience__metric">{achievement.metric}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="experience__tech">
              {experience.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
