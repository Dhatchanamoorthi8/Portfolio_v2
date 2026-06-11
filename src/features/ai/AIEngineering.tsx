import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { aiSkills, aiToolkit } from '../../data/portfolio';
import { Sparkles, BookOpen, ArrowRight, Zap, Workflow, Bot, Rocket } from 'lucide-react';

const tabs = [
  { key: 'toolkit', label: 'AI Toolkit', icon: Zap },
  { key: 'skills', label: 'AI Skills', icon: Bot },
  { key: 'roadmap', label: 'Roadmap', icon: Rocket },
];

const workflowSteps = [
  { icon: '💡', label: 'Ideation', desc: 'AI brainstorming & architecture design' },
  { icon: '🤖', label: 'AI-Assisted Code', desc: 'Gemini, Claude & Antigravity pair programming' },
  { icon: '🧪', label: 'Smart Testing', desc: 'AI-generated tests & edge case analysis' },
  { icon: '🚀', label: 'Deploy', desc: 'Production-ready, AI-optimized code' },
];

// Simple SVG icons for each AI tool
function AIToolIcon({ tool }: { tool: string }) {
  const iconStyle = { width: 28, height: 28 };
  switch (tool) {
    case 'gemini':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285F4" opacity="0.15"/>
          <path d="M12 4l2.5 5.5L20 12l-5.5 2.5L12 20l-2.5-5.5L4 12l5.5-2.5L12 4z" fill="#4285F4"/>
        </svg>
      );
    case 'chatgpt':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#10A37F" opacity="0.15"/>
          <path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'claude':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#D97757" opacity="0.15"/>
          <path d="M12 7c-3 0-5 2-5 5s2 5 5 5 5-2 5-5" stroke="#D97757" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#D97757"/>
        </svg>
      );
    case 'antigravity':
      return (
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#8B5CF6" opacity="0.15"/>
          <path d="M12 4l-6 14h4l2-5 2 5h4L12 4z" fill="#8B5CF6"/>
        </svg>
      );
    default:
      return <Zap size={28} />;
  }
}

export default function AIEngineering() {
  const [activeTab, setActiveTab] = useState('toolkit');

  return (
    <section id="ai-engineering" className="section">
      <div className="container">
        <SectionHeader
          tag="AI-Powered Builder"
          title={<>I Don't Just Build AI Apps — <span className="text-gradient">I Use AI to Build Better Apps</span></>}
          subtitle="Leveraging cutting-edge AI tools in every phase of development to ship faster, smarter, and more reliably."
        />

        {/* AI Workflow Pipeline */}
        <ScrollReveal>
          <div className="ai-workflow">
            {workflowSteps.map((step, i) => (
              <div key={step.label} className="ai-workflow__step">
                <motion.div
                  className="ai-workflow__card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                >
                  <span className="ai-workflow__emoji">{step.icon}</span>
                  <h4>{step.label}</h4>
                  <p>{step.desc}</p>
                </motion.div>
                {i < workflowSteps.length - 1 && (
                  <motion.div
                    className="ai-workflow__arrow"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal>
          <div className="ai-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`ai-tabs__btn ${activeTab === tab.key ? 'ai-tabs__btn--active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {activeTab === 'toolkit' && (
            <motion.div
              key="toolkit"
              className="ai-toolkit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {aiToolkit.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  className="ai-toolkit__card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  style={{ '--tool-color': tool.color } as React.CSSProperties}
                >
                  <div className="ai-toolkit__icon">
                    <AIToolIcon tool={tool.icon} />
                  </div>
                  <div className="ai-toolkit__info">
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                  </div>
                  <div className="ai-toolkit__glow" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              className="ai__grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ai__current">
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
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.03, x: 5 }}
                    >
                      <div className="ai__skill-dot ai__skill-dot--active" />
                      <span>{skill.name}</span>
                      <span className="ai__skill-status">Active</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap"
              className="ai__grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ai__roadmap" style={{ gridColumn: '1 / -1' }}>
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
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Built with AI badge */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="ai-builder-badge"
            whileHover={{ scale: 1.02 }}
          >
            <Workflow size={18} />
            <span>This portfolio was built using <strong>AI-assisted development</strong> with Gemini, Claude & Antigravity</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
