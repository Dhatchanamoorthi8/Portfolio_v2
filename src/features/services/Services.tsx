import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import GlassCard from '../../components/GlassCard';
import { services } from '../../data/portfolio';
import { Code2, Building2, Sparkles, Cloud, ChevronRight } from 'lucide-react';

const iconMap: Record<string, typeof Code2> = {
  code: Code2,
  building: Building2,
  sparkles: Sparkles,
  cloud: Cloud,
};

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader
          tag="Services"
          title="What I Can Build For You"
          subtitle="End-to-end development services for startups and enterprises."
        />

        <div className="services__grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <ScrollReveal key={service.title} delay={i * 0.1}>
                <GlassCard className="service-card">
                  <div className="service-card__icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.description}</p>
                  <ul className="service-card__features">
                    {service.features.map((f) => (
                      <li key={f}>
                        <ChevronRight size={12} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className="service-card__cta"
                    whileHover={{ x: 5 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Discuss Project
                    <ChevronRight size={14} />
                  </motion.button>
                </GlassCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
