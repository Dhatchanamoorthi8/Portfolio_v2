import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Sparkles, X, MessageSquare, Briefcase, Code2, Mail, Zap } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: 'init',
  sender: 'ai',
  text: "Hi! I'm Dhatchana's AI assistant. How can I help you explore his portfolio?",
};

export default function VisitorEngagement() {
  const [seconds, setSeconds] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [dismissed, setDismissed] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    if (mins > 0) return `${mins}m ${secs.toString().padStart(2, '0')}s`;
    return `${secs}s`;
  };

  const simulateTyping = (text: string, delay: number = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'ai', text }]);
    }, delay);
  };

  const handleQuickReply = (type: 'work' | 'stack' | 'contact' | 'surprise') => {
    let userText = '';
    let aiResponse = '';

    switch (type) {
      case 'work':
        userText = 'Are you available for work?';
        aiResponse = "Yes! Dhatchana is currently open for freelance and full-time roles. He specializes in Enterprise SaaS and AI integration.";
        break;
      case 'stack':
        userText = "What's your core tech stack?";
        aiResponse = "His core stack is React, Node.js, NestJS, and PostgreSQL, heavily supercharged by AI tools like Gemini and Claude.";
        break;
      case 'contact':
        userText = 'How can I get in touch?';
        aiResponse = "You can email him directly at messagetomoorthi@gmail.com, or use the contact form at the bottom of the page!";
        // Trigger mailto after a short delay
        setTimeout(() => {
          window.location.href = 'mailto:messagetomoorthi@gmail.com';
        }, 1500);
        break;
      case 'surprise':
        userText = 'Surprise me!';
        aiResponse = "Boom! 🚀 Thanks for checking out the portfolio. Did you know the interactive terminal in the hero section has hidden easter eggs?";
        triggerRandomSurprise();
        break;
    }

    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: userText }]);
    simulateTyping(aiResponse, 1000);
  };

  const triggerRandomSurprise = () => {
    const effects = [triggerTechBurst, triggerMatrixRain, triggerNeonPulse, triggerConfetti];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
  };

  const triggerTechBurst = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    const emojis = ['🤖', '✨', '🚀', '💻', '⚡', '🌌', '💡'];
    
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.backgroundColor = 'var(--accent)';
    flash.style.opacity = '0.15';
    flash.style.zIndex = '9998';
    flash.style.pointerEvents = 'none';
    flash.style.transition = 'opacity 0.5s ease-out';
    document.body.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; }, 50);
    setTimeout(() => { flash.remove(); }, 550);

    for (let i = 0; i < 35; i++) {
      const emoji = document.createElement('div');
      emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.fontSize = Math.random() > 0.8 ? '32px' : '20px';
      emoji.style.left = Math.random() * 100 + 'vw';
      emoji.style.bottom = '-50px';
      emoji.style.zIndex = '9999';
      emoji.style.filter = 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))';
      container.appendChild(emoji);

      const animation = emoji.animate([
        { transform: `translate3d(0,0,0) rotate(0deg) scale(0.5)`, opacity: 0 },
        { transform: `translate3d(${Math.random() * 100 - 50}px, -30vh, 0) rotate(${Math.random() * 180 - 90}deg) scale(1.2)`, opacity: 1, offset: 0.2 },
        { transform: `translate3d(${Math.random() * 200 - 100}px, -110vh, 0) rotate(${Math.random() * 360 - 180}deg) scale(1)`, opacity: 0 }
      ], {
        duration: Math.random() * 2000 + 2000,
        easing: 'cubic-bezier(.25,.8,.25,1)'
      });

      animation.onfinish = () => emoji.remove();
    }
  };

  const triggerMatrixRain = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    for (let i = 0; i < 60; i++) {
      const drop = document.createElement('div');
      drop.innerText = Math.random() > 0.5 ? '1' : '0';
      drop.style.position = 'absolute';
      drop.style.color = '#4ade80';
      drop.style.fontFamily = 'monospace';
      drop.style.fontSize = '24px';
      drop.style.fontWeight = 'bold';
      drop.style.textShadow = '0 0 8px #4ade80';
      drop.style.left = Math.random() * 100 + 'vw';
      drop.style.top = '-50px';
      drop.style.zIndex = '9999';
      container.appendChild(drop);

      const animation = drop.animate([
        { transform: 'translateY(0)', opacity: 0 },
        { transform: 'translateY(20vh)', opacity: 1, offset: 0.2 },
        { transform: `translateY(110vh)`, opacity: 0 }
      ], {
        duration: Math.random() * 1500 + 1500,
        easing: 'linear',
        delay: Math.random() * 1000
      });

      animation.onfinish = () => drop.remove();
    }
  };

  const triggerNeonPulse = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.style.position = 'fixed';
      ring.style.top = '50%';
      ring.style.left = '50%';
      ring.style.width = '10px';
      ring.style.height = '10px';
      ring.style.borderRadius = '50%';
      ring.style.border = `4px solid ${i % 2 === 0 ? 'var(--accent)' : '#4ade80'}`;
      ring.style.boxShadow = `0 0 20px ${i % 2 === 0 ? 'var(--accent)' : '#4ade80'}`;
      ring.style.transform = 'translate(-50%, -50%)';
      ring.style.zIndex = '9998';
      ring.style.pointerEvents = 'none';
      container.appendChild(ring);

      const animation = ring.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(150)', opacity: 0 }
      ], {
        duration: 1500,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
        delay: i * 300
      });

      animation.onfinish = () => ring.remove();
    }
  };

  const triggerConfetti = () => {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.backgroundColor = ['#8B5CF6', '#4ade80', '#3b82f6', '#f43f5e', '#fbbf24'][Math.floor(Math.random() * 5)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.zIndex = '9999';
      container.appendChild(confetti);

      const animation = confetti.animate([
        { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 1000 + 1500,
        easing: 'cubic-bezier(.37,0,.63,1)'
      });

      animation.onfinish = () => confetti.remove();
    }
  };

  if (dismissed) return null;

  return (
    <>
      <div id="confetti-container" className="confetti-container" />
      
      <div className="visitor-engagement">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="visitor-chat"
              initial={{ opacity: 0, y: 20, scale: 0.95, originY: 1, originX: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="visitor-chat__header">
                <div className="visitor-chat__title">
                  <Sparkles size={16} />
                  <span>AI Assistant</span>
                </div>
                <button 
                  className="visitor-engagement__close"
                  onClick={() => setIsExpanded(false)}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="visitor-chat__body" ref={chatBodyRef}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`visitor-chat__message visitor-chat__message--${msg.sender}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="visitor-chat__bubble">
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="visitor-chat__message visitor-chat__message--ai">
                    <div className="visitor-chat__typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
              </div>

              <div className="visitor-chat__replies">
                <button className="visitor-chat__reply-btn" onClick={() => handleQuickReply('work')}>
                  <Briefcase size={14} /> Are you available for work?
                </button>
                <button className="visitor-chat__reply-btn" onClick={() => handleQuickReply('stack')}>
                  <Code2 size={14} /> What's your tech stack?
                </button>
                <button className="visitor-chat__reply-btn" onClick={() => handleQuickReply('contact')}>
                  <Mail size={14} /> Get in touch
                </button>
                <button className="visitor-chat__reply-btn" onClick={() => handleQuickReply('surprise')}>
                  <Zap size={14} /> Surprise me!
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="visitor-engagement__pill"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="visitor-engagement__timer">
            <Clock size={13} />
            <span>{formatTime(seconds)}</span>
          </div>
          <div className="visitor-engagement__ask">
            <MessageSquare size={13} />
            <span>Ask AI</span>
          </div>
        </motion.div>
        
        {!isExpanded && (
          <button
            className="visitor-engagement__close"
            onClick={(e) => {
              e.stopPropagation();
              setDismissed(true);
            }}
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </>
  );
}
