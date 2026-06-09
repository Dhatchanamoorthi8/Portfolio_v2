import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import { systemDesigns } from '../../data/portfolio';
import { ArrowDown } from 'lucide-react';

export default function SystemDesign() {
  const [activeDesign, setActiveDesign] = useState(0);
  const design = systemDesigns[activeDesign];

  return (
    <section id="system-design" className="section section--alt">
      <div className="container">
        <SectionHeader
          tag="System Design"
          title="How I Build Scalable Systems"
          subtitle="Architecture patterns and design decisions behind production-grade applications."
        />

        <ScrollReveal>
          <div className="sysdesign__tabs">
            {systemDesigns.map((d, i) => (
              <button
                key={d.title}
                className={`sysdesign__tab ${activeDesign === i ? 'sysdesign__tab--active' : ''}`}
                onClick={() => setActiveDesign(i)}
              >
                {d.title}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="sysdesign__diagram">
            <div className="sysdesign__flow">
              {design.nodes.map((node, i) => (
                <div key={`${activeDesign}-${i}`} className="sysdesign__node-wrapper">
                  <motion.div
                    className="sysdesign__node"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    key={`${activeDesign}-node-${i}`}
                  >
                    <div className="sysdesign__node-index">{String(i + 1).padStart(2, '0')}</div>
                    <div className="sysdesign__node-label">{node}</div>
                  </motion.div>
                  {i < design.nodes.length - 1 && (
                    <motion.div
                      className="sysdesign__connector"
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ delay: i * 0.12 + 0.06, duration: 0.3 }}
                      key={`${activeDesign}-conn-${i}`}
                    >
                      <ArrowDown size={16} />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
