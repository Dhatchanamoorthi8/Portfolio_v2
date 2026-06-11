import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, FileText, Mail, Code2, Database, Cloud, Brain, Server, Shield, Cpu } from 'lucide-react';
import InteractiveTerminal from './InteractiveTerminal';

const floatingIcons = [
  { Icon: Code2, x: '10%', y: '20%', delay: 0 },
  { Icon: Database, x: '85%', y: '15%', delay: 0.5 },
  { Icon: Cloud, x: '75%', y: '70%', delay: 1 },
  { Icon: Brain, x: '15%', y: '75%', delay: 1.5 },
  { Icon: Server, x: '90%', y: '45%', delay: 0.8 },
  { Icon: Shield, x: '5%', y: '50%', delay: 1.2 },
  { Icon: Cpu, x: '50%', y: '10%', delay: 0.3 },
];

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__particles" />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="hero__floating-icon"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: 'easeInOut' }}
          >
            <Icon size={28} />
          </motion.div>
        </motion.div>
      ))}

      <div className="hero__content">
        <div className="hero__text">
          <motion.div
            className="hero__availability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hero__availability-dot" />
            Available for Freelance & Full-time
          </motion.div>

          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Building{' '}
            <span className="text-gradient">Enterprise SaaS</span>
            {' '}Applications &{' '}
            <span className="text-gradient">AI-Powered</span>
            {' '}Solutions
          </motion.h1>

          <motion.div
            className="hero__typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'AI-Powered Builder',
                2000,
                'SaaS Architect',
                2000,
                'Enterprise Solutions Developer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="hero__typing-text"
            />
          </motion.div>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Full Stack Developer at <strong>Iviewsense</strong> — specializing in scalable web applications, 
            workflow automation, cloud deployments, and AI-powered development.
          </motion.p>

          {/* Built with AI badge */}
          <motion.div
            className="hero__ai-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <span className="hero__ai-badge-shimmer" />
            <Brain size={14} />
            <span>Building with AI — Gemini · Claude · ChatGPT · Antigravity</span>
          </motion.div>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button className="btn btn--primary" onClick={scrollToProjects}>
              View Projects
              <ArrowDown size={16} />
            </button>
            <a href="/resume.pdf" download className="btn btn--outline">
              <FileText size={16} />
              Download Resume
            </a>
            <button className="btn btn--ghost" onClick={scrollToContact}>
              <Mail size={16} />
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Interactive Terminal replaces static code block */}
        <InteractiveTerminal />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
