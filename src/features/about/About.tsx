import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { useAnimatedCounter } from '../../hooks/useScrollSpy';
import { Briefcase, Code2, Rocket, Brain } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 2, suffix: '+', label: 'Years Experience' },
  { icon: Code2, value: 120, suffix: '+', label: 'API Endpoints Built' },
  { icon: Rocket, value: 4, suffix: '+', label: 'Production Projects' },
  { icon: Brain, value: 3, suffix: '+', label: 'AI Projects' },
];

const timeline = [
  {
    year: '2023',
    title: 'Started Professional Journey',
    description: 'Joined as a Software Developer, diving into enterprise SaaS development with React.js and Node.js.',
  },
  {
    year: '2023',
    title: 'Enterprise SaaS Deep Dive',
    description: 'Built CalibMaster platform — mastering NestJS, PostgreSQL, RBAC security, and workflow automation.',
  },
  {
    year: '2024',
    title: 'Production & Scale',
    description: 'Managed Azure production deployments, database optimization, and multi-tenant architecture.',
  },
  {
    year: '2025',
    title: 'AI Engineering Journey',
    description: 'Expanded into AI with OpenAI APIs, RAG architecture, vector databases, and LangChain.',
  },
];

function StatCard({ icon: Icon, value, suffix, label }: { icon: typeof Briefcase; value: number; suffix: string; label: string }) {
  const { count, ref } = useAnimatedCounter(value);
  return (
    <div className="about__stat" ref={ref}>
      <Icon size={24} className="about__stat-icon" />
      <div className="about__stat-value">
        {count}{suffix}
      </div>
      <div className="about__stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeader
          tag="About Me"
          title="Crafting Enterprise-Grade Solutions"
          subtitle="A results-driven full stack developer with a passion for building scalable systems and exploring AI engineering."
        />

        <div className="about__stats">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <StatCard {...stat} />
            </ScrollReveal>
          ))}
        </div>

        <div className="about__grid">
          <ScrollReveal className="about__summary">
            <p>
              Results-driven Full Stack Developer with <strong>2+ years</strong> of experience building
              enterprise SaaS applications using <strong>React.js, Node.js, NestJS, TypeScript, PostgreSQL</strong>,
              and <strong>Azure</strong>.
            </p>
            <p>
              I specialize in building production-grade systems with complex workflows — from
              calibration management platforms to AI-powered document assistants. My focus is on
              writing clean, scalable code that delivers real business value.
            </p>
            <p>
              Currently expanding my expertise into <strong>AI Engineering</strong> — working with
              OpenAI APIs, RAG architectures, vector databases, and autonomous AI agents.
            </p>

            <div className="about__focuses">
              {['Enterprise SaaS', 'Full-Stack Architecture', 'AI Integration', 'Cloud Deployments', 'System Design'].map((focus) => (
                <span key={focus} className="about__focus-chip">{focus}</span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="about__timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className="about__timeline-item"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="about__timeline-marker">
                  <div className="about__timeline-dot" />
                  {i < timeline.length - 1 && <div className="about__timeline-line" />}
                </div>
                <div className="about__timeline-content">
                  <span className="about__timeline-year">{item.year}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
