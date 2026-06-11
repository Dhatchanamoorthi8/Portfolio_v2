import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/SectionHeader';
import ScrollReveal from '../../components/ScrollReveal';
import GlassCard from '../../components/GlassCard';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../../lib/supabase';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // 1. Send via EmailJS (so you get the email notification)
      const emailPromise = emailjs.sendForm(
        'service_ny2pqdp',   // Replace with your EmailJS service ID
        'template_ovlh6st',  // Replace with your EmailJS template ID
        formRef.current!,
        'NFVi6cMwXiMO8HYPR'  // Replace with your EmailJS public key
      );

      // 2. Save to Supabase (so you can view it on Admin Dashboard)
      const supabasePromise = supabase?.from('contact_messages').insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }]);

      await Promise.all([emailPromise, supabasePromise]);
      
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socials = [
    { icon: Mail, label: 'Email', href: 'mailto:messagetomoorthi@gmail.com', value: 'messagetomoorthi@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhatchanamoorthi-ap/', value: 'linkedin.com/in/dhatchanamoorthi-ap', target: '_blank' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/Dhatchanamoorthi8', value: 'github.com/Dhatchanamoorthi8', target: '_blank' },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeader
          tag="Get In Touch"
          title="Let's Build Something Together"
          subtitle="Have a project in mind? Let's discuss how I can help bring your ideas to life."
        />

        <div className="contact__grid">
          <ScrollReveal className="contact__form-wrapper">
            <GlassCard hover={false}>
              <form ref={formRef} onSubmit={handleSubmit} className="contact__form">
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Discussion"
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`btn btn--primary btn--full ${status === 'sending' ? 'btn--loading' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'sent' ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle size={16} />
                      Failed. Try Again
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="contact__info">
            <div className="contact__socials">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel="noopener noreferrer"
                  className="contact__social"
                  whileHover={{ x: 5 }}
                >
                  <div className="contact__social-icon">
                    <social.icon size={20} />
                  </div>
                  <div>
                    <div className="contact__social-label">{social.label}</div>
                    <div className="contact__social-value">{social.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact__availability">
              <span className="contact__availability-dot" />
              <div>
                <strong>Available for freelance projects</strong>
                <p>Currently accepting new projects and collaborations.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {(status === 'sent' || status === 'error') && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '32px',
              zIndex: 1000,
              padding: '16px 24px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(22, 22, 29, 0.95)',
              border: `1px solid ${status === 'sent' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              boxShadow: `0 8px 32px ${status === 'sent' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`,
              backdropFilter: 'blur(10px)',
              color: '#fff',
            }}
          >
            {status === 'sent' ? (
              <CheckCircle size={24} color="#4ade80" />
            ) : (
              <AlertCircle size={24} color="#ef4444" />
            )}
            <div style={{ paddingRight: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>
                {status === 'sent' ? 'Message Sent Successfully' : 'Failed to Send Message'}
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa', marginTop: '2px' }}>
                {status === 'sent'
                  ? 'I will get back to you as soon as possible.'
                  : 'Please check your EmailJS configuration.'}
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              style={{ marginLeft: 'auto', padding: '4px', background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', display: 'flex' }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
