import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Users, Activity, Globe, Lock, LogOut, KeyRound, Save, Download, Mail, Clock, LayoutDashboard } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Visit = {
  id: number;
  created_at: string;
  session_id: string;
  user_agent: string;
  screen_resolution: string;
  language: string;
  path: string;
  time_spent_seconds: number;
};

type Download = {
  id: number;
  created_at: string;
  session_id: string;
  user_agent: string;
};

type Message = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  
  // Data states
  const [visits, setVisits] = useState<Visit[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'overview' | 'visits' | 'downloads' | 'messages'>('overview');
  const [isUpdatingPin, setIsUpdatingPin] = useState(false);
  const [newPin, setNewPin] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAdminPin = async () => {
    if (!supabase) return '1234';
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_pin')
        .single();
      
      if (error || !data) return '1234';
      return data.value;
    } catch {
      return '1234';
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    if (!supabase) {
      console.warn("Supabase client is not initialized.");
      setLoading(false);
      return;
    }
    
    try {
      const [visitsRes, downloadsRes, messagesRes] = await Promise.all([
        supabase.from('page_visits').select('*').order('created_at', { ascending: false }),
        supabase.from('resume_downloads').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      ]);

      if (visitsRes.data) setVisits(visitsRes.data);
      if (downloadsRes.data) setDownloads(downloadsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const markMessageAsRead = async (id: number) => {
    if (!supabase) return;
    try {
      await supabase.from('contact_messages').update({ read: true }).eq('id', id);
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = await fetchAdminPin();
    
    if (pin === correctPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect Password');
      setPin('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    
    if (!supabase) {
      alert('Supabase is not connected');
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ value: newPin })
        .eq('key', 'admin_pin');

      if (error) throw error;
      
      alert('Password updated successfully!');
      setNewPin('');
      setIsUpdatingPin(false);
    } catch (err) {
      console.error('Error updating password:', err);
      alert('Failed to update password in database.');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)',
    borderRadius: '10px', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '16px', outline: 'none'
  };

  if (!isAuthenticated) {
    return (
      <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
          <div className="glass-card__content" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', color: 'var(--accent)' }}>
                <Lock size={36} />
              </div>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Admin Dashboard</h1>
            <form onSubmit={handleLogin}>
              <input type="password" placeholder="Enter Password" value={pin} onChange={(e) => setPin(e.target.value)} style={inputStyle} autoFocus />
              <button type="submit" className="btn btn--primary btn--full" style={{ justifyContent: 'center', marginTop: '8px' }}>Access Dashboard</button>
            </form>
            <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Hint: The default password is 1234</p>
          </div>
        </div>
      </section>
    );
  }

  // Analytics Calculations
  const uniqueUsers = new Set(visits.map(v => v.session_id)).size;
  const totalTimeSpent = visits.reduce((acc, curr) => acc + (curr.time_spent_seconds || 0), 0);
  const avgTimeSpent = uniqueUsers > 0 ? Math.floor(totalTimeSpent / uniqueUsers) : 0;
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <section className="section" style={{ minHeight: '100vh', padding: '60px 24px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '20px' }}>
          <div>
            <h1 className="section-title" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <Activity className="text-accent" size={36} />
              Command Center
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>Track portfolio engagement, downloads, and messages.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setIsUpdatingPin(!isUpdatingPin)} className="btn btn--outline" style={{ display: 'flex', gap: '8px' }}>
              <KeyRound size={16} /> Update Password
            </button>
            <button onClick={handleLogout} className="btn btn--ghost" style={{ display: 'flex', gap: '8px', background: 'rgba(255,0,0,0.1)', color: '#ff5f56' }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Update PIN Section */}
        {isUpdatingPin && (
          <div className="glass-card" style={{ marginBottom: '32px' }}>
            <div className="glass-card__content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Update Admin Password</h3>
              <form onSubmit={handleUpdatePin} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <input type="password" placeholder="New Password" value={newPin} onChange={(e) => setNewPin(e.target.value)} style={{ ...inputStyle, marginBottom: 0, maxWidth: '300px' }} autoFocus />
                <button type="submit" className="btn btn--primary" style={{ height: '48px' }}><Save size={18} /> Save Password</button>
                <button type="button" className="btn btn--ghost" onClick={() => setIsUpdatingPin(false)} style={{ height: '48px' }}>Cancel</button>
              </form>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'visits', icon: Users, label: 'Visitor Logs' },
            { id: 'downloads', icon: Download, label: 'Resume Downloads' },
            { id: 'messages', icon: Mail, label: `Inbox (${unreadMessages} new)` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`btn ${activeTab === tab.id ? 'btn--primary' : 'btn--outline'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading analytics data...</div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div className="glass-card">
                  <div className="glass-card__content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Unique Visitors</p>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '8px' }}>{uniqueUsers}</h3>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', borderRadius: '12px' }}><Users size={28} /></div>
                  </div>
                </div>
                
                <div className="glass-card">
                  <div className="glass-card__content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Total Page Views</p>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '8px' }}>{visits.length}</h3>
                    </div>
                    <div style={{ padding: '12px', background: 'hsl(var(--accent-hue), var(--accent-sat), 55%, 0.1)', color: 'var(--accent)', borderRadius: '12px' }}><Globe size={28} /></div>
                  </div>
                </div>

                <div className="glass-card">
                  <div className="glass-card__content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Avg Time Spent</p>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '8px' }}>
                        {Math.floor(avgTimeSpent / 60)}m {avgTimeSpent % 60}s
                      </h3>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', borderRadius: '12px' }}><Clock size={28} /></div>
                  </div>
                </div>

                <div className="glass-card">
                  <div className="glass-card__content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Resume Downloads</p>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginTop: '8px' }}>{downloads.length}</h3>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', borderRadius: '12px' }}><Download size={28} /></div>
                  </div>
                </div>
              </div>
            )}

            {/* VISITS TAB */}
            {activeTab === 'visits' && (
              <div className="glass-card">
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Detailed Visitor Logs</h2>
                  <button onClick={fetchAllData} className="btn btn--sm btn--outline">Refresh</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Time</th>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Session ID</th>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Spent</th>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Device / Browser</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visits.length === 0 ? <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center' }}>No visits yet.</td></tr> : visits.map((visit) => (
                        <tr key={visit.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>{format(new Date(visit.created_at), 'MMM d, h:mm a')}</td>
                          <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace' }}>{visit.session_id ? visit.session_id.slice(0,6) : 'unknown'}</span></td>
                          <td style={{ padding: '16px 24px', color: 'var(--accent)' }}>{Math.floor(visit.time_spent_seconds / 60)}m {visit.time_spent_seconds % 60}s</td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={visit.user_agent}>{visit.user_agent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DOWNLOADS TAB */}
            {activeTab === 'downloads' && (
              <div className="glass-card">
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Resume Downloads</h2>
                  <button onClick={fetchAllData} className="btn btn--sm btn--outline">Refresh</button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(0,0,0,0.2)' }}>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Time</th>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Session ID</th>
                        <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Device / Browser</th>
                      </tr>
                    </thead>
                    <tbody>
                      {downloads.length === 0 ? <tr><td colSpan={3} style={{ padding: '24px', textAlign: 'center' }}>No downloads yet.</td></tr> : downloads.map((dl) => (
                        <tr key={dl.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '16px 24px', whiteSpace: 'nowrap' }}>{format(new Date(dl.created_at), 'MMM d, yyyy • h:mm a')}</td>
                          <td style={{ padding: '16px 24px' }}><span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', fontSize: '0.85rem', fontFamily: 'monospace' }}>{dl.session_id ? dl.session_id.slice(0,6) : 'unknown'}</span></td>
                          <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{dl.user_agent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {messages.length === 0 ? (
                  <div className="glass-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No messages received yet.
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className="glass-card" style={{ border: msg.read ? '1px solid var(--border)' : '1px solid var(--accent)' }}>
                      <div className="glass-card__content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {!msg.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />}
                              {msg.name}
                            </h3>
                            <a href={`mailto:${msg.email}`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{msg.email}</a>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{format(new Date(msg.created_at), 'MMM d, yyyy • h:mm a')}</div>
                            {!msg.read && (
                              <button onClick={() => markMessageAsRead(msg.id)} className="btn btn--sm btn--outline">Mark as Read</button>
                            )}
                          </div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Subject: {msg.subject}</h4>
                          <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
