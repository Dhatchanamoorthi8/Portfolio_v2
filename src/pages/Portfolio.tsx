import { lazy, Suspense, useEffect } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import Navbar from '../components/Navbar';
import ThemeCustomizer from '../components/ThemeCustomizer';
import Footer from '../components/Footer';
import Hero from '../features/hero/Hero';
import ScrollProgress from '../components/ScrollProgress';
import VisitorEngagement from '../components/VisitorEngagement';
import useTracking from '../hooks/useTracking';

// Lazy load sections for performance
const About = lazy(() => import('../features/about/About'));
const Experience = lazy(() => import('../features/experience/Experience'));
const Projects = lazy(() => import('../features/projects/Projects'));
const SystemDesign = lazy(() => import('../features/system-design/SystemDesign'));
const AIEngineering = lazy(() => import('../features/ai/AIEngineering'));
const Skills = lazy(() => import('../features/skills/Skills'));
const Services = lazy(() => import('../features/services/Services'));
const Achievements = lazy(() => import('../features/achievements/Achievements'));
const Contact = lazy(() => import('../features/contact/Contact'));

function SectionLoader() {
  return (
    <div className="section-loader">
      <div className="section-loader__spinner" />
    </div>
  );
}

export default function Portfolio() {
  const { theme } = usePortfolioStore();

  // Initialize tracking hook
  useTracking();

  // Apply theme CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-hue', String(theme.accentHue));
    root.style.setProperty('--accent-sat', `${theme.accentSaturation}%`);

    const fontSizeMap = { small: '14px', medium: '16px', large: '18px' };
    root.style.setProperty('--base-font-size', fontSizeMap[theme.fontSize]);
  }, [theme]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <ThemeCustomizer />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SystemDesign />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AIEngineering />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <VisitorEngagement />
    </>
  );
}
