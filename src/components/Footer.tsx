import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">Dhatchana<span className="text-accent">.</span></span>
            <p>Full Stack Developer · SaaS Builder · AI Engineer</p>
          </div>

          <div className="footer__links">
            <a href="mailto:your@email.com" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>

          <div className="footer__copy">
            <p>
              © {currentYear} Dhatchana Moorthi AP. Built with{' '}
              <Heart size={12} className="footer__heart" /> using React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
