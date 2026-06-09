import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, FileText, Mail, Code2, Database, Cloud, Brain, Server, Shield, Cpu } from 'lucide-react';

const floatingIcons = [
  { Icon: Code2, x: '10%', y: '20%', delay: 0 },
  { Icon: Database, x: '85%', y: '15%', delay: 0.5 },
  { Icon: Cloud, x: '75%', y: '70%', delay: 1 },
  { Icon: Brain, x: '15%', y: '75%', delay: 1.5 },
  { Icon: Server, x: '90%', y: '45%', delay: 0.8 },
  { Icon: Shield, x: '5%', y: '50%', delay: 1.2 },
  { Icon: Cpu, x: '50%', y: '10%', delay: 0.3 },
];

const codeLines = [
  '@Controller("api/calibration")',
  'export class CalibrationController {',
  '  constructor(',
  '    private readonly service: CalibrationService,',
  '  ) {}',
  '',
  '  @Post("generate-certificate")',
  '  @UseGuards(RBACGuard)',
  '  async generateCertificate(',
  '    @Body() dto: CertificateDto,',
  '  ) {',
  '    return this.service.generate(dto);',
  '  }',
  '}',
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
                'SaaS Builder',
                2000,
                'AI-Powered Developer',
                2000,
                'Enterprise Solutions Architect',
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
            Full Stack Developer specializing in scalable web applications, workflow automation,
            cloud deployments, and AI integration.
          </motion.p>

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

        {/* Live code animation */}
        <motion.div
          className="hero__code"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="hero__code-window">
            <div className="hero__code-header">
              <div className="hero__code-dots">
                <span /><span /><span />
              </div>
              <span className="hero__code-filename">calibration.controller.ts</span>
            </div>
            <div className="hero__code-body">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="hero__code-line"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                >
                  <span className="hero__code-num">{i + 1}</span>
                  <span
                    className="hero__code-text"
                    dangerouslySetInnerHTML={{ __html: highlightCode(line) }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
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

function highlightCode(line: string): string {
  let html = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return html.replace(
    /(@\w+|"[^"]*"|\/\/.*$|\b(?:export|class|constructor|private|readonly|async|return|const)\b|\b(?:string|number|boolean|void)\b|\b(?:CalibrationController|CalibrationService|CertificateDto|RBACGuard)\b)/g,
    (match) => {
      if (match.startsWith('@')) return `<span class="code--decorator">${match}</span>`;
      if (match.startsWith('"')) return `<span class="code--string">${match}</span>`;
      if (match.startsWith('//')) return `<span class="code--comment">${match}</span>`;
      if (/^(export|class|constructor|private|readonly|async|return|const)$/.test(match)) {
        return `<span class="code--keyword">${match}</span>`;
      }
      if (/^(string|number|boolean|void)$/.test(match)) {
        return `<span class="code--type">${match}</span>`;
      }
      return `<span class="code--class">${match}</span>`;
    }
  );
}
