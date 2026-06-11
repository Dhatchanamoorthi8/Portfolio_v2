import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'info';
  text: string;
  delay: number;
}

const terminalScript: TerminalLine[] = [
  { type: 'command', text: '> dhatchana --init enterprise-saas', delay: 0 },
  { type: 'success', text: '✓ CalibMaster SaaS initialized', delay: 800 },
  { type: 'info', text: '  → React.js + NestJS + PostgreSQL', delay: 1200 },
  { type: 'command', text: '> ai.assist --tool gemini "Design RBAC module"', delay: 2200 },
  { type: 'success', text: '✓ 12 API endpoints generated with AI', delay: 3000 },
  { type: 'command', text: '> deploy --azure --production', delay: 4000 },
  { type: 'success', text: '✓ Live at calibmaster.app — 500+ users', delay: 4800 },
  { type: 'info', text: '  → 99.5% uptime · <2s cert generation', delay: 5200 },
  { type: 'command', text: '> ai.build --rag-pipeline', delay: 6200 },
  { type: 'success', text: '✓ AI Document Assistant deployed', delay: 7000 },
  { type: 'info', text: '  → Pinecone + HuggingFace + Streaming UI', delay: 7400 },
];

const easterEggs: Record<string, string> = {
  'help': '📋 Available: about, skills, contact, hire, coffee',
  'about': '🚀 Full Stack Dev @ Iviewsense | 2+ yrs | SaaS + AI',
  'skills': '⚡ React · Node · NestJS · TypeScript · AI · Azure',
  'contact': '📧 messagetomoorthi@gmail.com',
  'hire': '✅ Available for freelance & full-time opportunities!',
  'coffee': '☕ console.log("Fueled by coffee and curiosity")',
  'hello': '👋 Hey there! Thanks for exploring my portfolio!',
  'ai': '🤖 I use Gemini, ChatGPT, Claude & Antigravity daily',
};

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<{ type: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [scriptDone, setScriptDone] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-play script
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    terminalScript.forEach((line, i) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, { type: line.type, text: line.text }]);
        if (i === terminalScript.length - 1) {
          setTimeout(() => setScriptDone(true), 800);
        }
      }, line.delay + 500);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setLines((prev) => [
      ...prev,
      { type: 'command', text: `> ${input}` },
    ]);

    const response = easterEggs[cmd] || `🤔 Unknown command: "${cmd}". Try "help"`;
    setTimeout(() => {
      setLines((prev) => [...prev, { type: 'output', text: response }]);
    }, 300);

    setInput('');
  };

  return (
    <motion.div
      className="interactive-terminal"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <div className="interactive-terminal__window">
        <div className="interactive-terminal__header">
          <div className="interactive-terminal__dots">
            <span />
            <span />
            <span />
          </div>
          <span className="interactive-terminal__title">dhatchana@portfolio:~</span>
        </div>
        <div className="interactive-terminal__body" ref={bodyRef}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className={`interactive-terminal__line interactive-terminal__line--${line.type}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {line.text}
            </motion.div>
          ))}
          {scriptDone && (
            <form onSubmit={handleCommand} className="interactive-terminal__input-line">
              <span className="interactive-terminal__prompt">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="interactive-terminal__input"
                placeholder='Type "help" to explore...'
                autoFocus={false}
              />
              <span
                className="interactive-terminal__cursor"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
