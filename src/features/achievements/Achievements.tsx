import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { useAnimatedCounter } from '../../hooks/useScrollSpy';
import { Building2, Rocket, Brain, Layers, Cloud } from 'lucide-react';

const achievements = [
  {
    icon: Building2,
    value: 1,
    suffix: '',
    title: 'Enterprise SaaS Platform',
    description: 'Built CalibMaster from ground up — a full enterprise calibration management system.',
    size: 'large' as const,
  },
  {
    icon: Rocket,
    value: 4,
    suffix: '+',
    title: 'Production Deployments',
    description: 'Managed production applications on Azure with 99.5% uptime.',
    size: 'medium' as const,
  },
  {
    icon: Brain,
    value: 3,
    suffix: '+',
    title: 'AI Projects',
    description: 'RAG applications, AI assistants, and intelligent automation.',
    size: 'medium' as const,
  },
  {
    icon: Layers,
    value: 120,
    suffix: '+',
    title: 'API Endpoints',
    description: 'Designed and implemented RESTful APIs for enterprise applications.',
    size: 'small' as const,
  },
  {
    icon: Cloud,
    value: 500,
    suffix: '+',
    title: 'Active Users',
    description: 'Applications serving hundreds of enterprise users daily.',
    size: 'small' as const,
  },
];

function AchievementCard({ achievement }: { achievement: typeof achievements[0] }) {
  const { count, ref } = useAnimatedCounter(achievement.value);
  const Icon = achievement.icon;

  return (
    <div className={`achievement-card achievement-card--${achievement.size}`} ref={ref}>
      <div className="achievement-card__icon">
        <Icon size={achievement.size === 'large' ? 32 : 24} />
      </div>
      <div className="achievement-card__value">
        {count}{achievement.suffix}
      </div>
      <h4 className="achievement-card__title">{achievement.title}</h4>
      <p className="achievement-card__desc">{achievement.description}</p>
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="section section--alt">
      <div className="container">
        <SectionHeader
          tag="Impact"
          title="Achievements & Impact"
          subtitle="Measurable results from building enterprise-grade applications."
        />

        <div className="achievements__bento">
          {achievements.map((achievement, i) => (
            <ScrollReveal key={achievement.title} delay={i * 0.1}>
              <AchievementCard achievement={achievement} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
