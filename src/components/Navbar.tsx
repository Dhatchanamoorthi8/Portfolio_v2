import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Palette } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'system-design', label: 'Architecture' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, toggleCustomizer } = usePortfolioStore();
  const activeSection = useScrollSpy(navItems.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    closeMobileMenu();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__inner">
          <button className="navbar__logo" onClick={() => scrollTo('hero')}>
            <span className="navbar__logo-icon">D</span>
            <span className="navbar__logo-text">Dhatchana<span className="text-accent">.</span></span>
          </button>

          <div className="navbar__links">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                className={`navbar__link ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div className="navbar__link-indicator" layoutId="navIndicator" />
                )}
              </button>
            ))}
          </div>

          <div className="navbar__actions">
            <button
              className="navbar__icon-btn"
              onClick={toggleCustomizer}
              aria-label="Customize theme"
            >
              <Palette size={18} />
            </button>
            <button className="btn btn--primary btn--sm" onClick={() => scrollTo('contact')}>
              Hire Me
            </button>
            <button
              className="navbar__hamburger"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu__items">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className={`mobile-menu__item ${activeSection === item.id ? 'mobile-menu__item--active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
