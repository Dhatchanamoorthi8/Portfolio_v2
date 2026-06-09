import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, Droplets } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const presetColors = [
  { name: 'Violet', hue: 250, sat: 90 },
  { name: 'Blue', hue: 220, sat: 90 },
  { name: 'Cyan', hue: 190, sat: 85 },
  { name: 'Emerald', hue: 155, sat: 80 },
  { name: 'Amber', hue: 40, sat: 90 },
  { name: 'Rose', hue: 340, sat: 85 },
  { name: 'Orange', hue: 25, sat: 90 },
  { name: 'Teal', hue: 170, sat: 75 },
];

const fontSizes = [
  { label: 'Small', value: 'small' as const },
  { label: 'Medium', value: 'medium' as const },
  { label: 'Large', value: 'large' as const },
];

export default function ThemeCustomizer() {
  const { isCustomizerOpen, toggleCustomizer, theme, setTheme } = usePortfolioStore();

  return (
    <AnimatePresence>
      {isCustomizerOpen && (
        <>
          <motion.div
            className="customizer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCustomizer}
          />
          <motion.div
            className="customizer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="customizer-panel__header">
              <h3>Customize Theme</h3>
              <button onClick={toggleCustomizer} aria-label="Close customizer">
                <X size={20} />
              </button>
            </div>

            <div className="customizer-panel__section">
              <div className="customizer-panel__label">
                <Droplets size={16} />
                <span>Accent Color</span>
              </div>
              <div className="customizer-panel__colors">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    className={`customizer-panel__color-btn ${theme.accentHue === color.hue ? 'customizer-panel__color-btn--active' : ''}`}
                    style={{ background: `hsl(${color.hue}, ${color.sat}%, 55%)` }}
                    onClick={() => setTheme({ accentHue: color.hue, accentSaturation: color.sat })}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="customizer-panel__slider-group">
                <label>Hue: {theme.accentHue}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={theme.accentHue}
                  onChange={(e) => setTheme({ accentHue: parseInt(e.target.value) })}
                  className="customizer-panel__slider"
                  style={{
                    background: `linear-gradient(to right, hsl(0,90%,55%), hsl(60,90%,55%), hsl(120,90%,55%), hsl(180,90%,55%), hsl(240,90%,55%), hsl(300,90%,55%), hsl(360,90%,55%))`,
                  }}
                />
              </div>
            </div>

            <div className="customizer-panel__section">
              <div className="customizer-panel__label">
                <Type size={16} />
                <span>Font Size</span>
              </div>
              <div className="customizer-panel__font-sizes">
                {fontSizes.map((fs) => (
                  <button
                    key={fs.value}
                    className={`customizer-panel__font-btn ${theme.fontSize === fs.value ? 'customizer-panel__font-btn--active' : ''}`}
                    onClick={() => setTheme({ fontSize: fs.value })}
                  >
                    {fs.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
