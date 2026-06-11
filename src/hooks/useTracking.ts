import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

// Helper to generate a random session ID
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const trackResumeDownload = async () => {
  if (!supabase) return;
  try {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('session_id', sessionId);
    }
    await supabase.from('resume_downloads').insert([
      {
        session_id: sessionId,
        user_agent: navigator.userAgent,
      },
    ]);
  } catch (err) {
    console.error('Failed to track resume download:', err);
  }
};

export default function useTracking() {
  const visitIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // We only want to insert a visit record once per page load.
    // If we've already tracked this specific visit in this component mount, skip.
    if (visitIdRef.current) return;

    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      localStorage.setItem('session_id', sessionId);
    }

    const trackVisit = async () => {
      if (!supabase) return;

      try {
        const userAgent = navigator.userAgent;
        const screenResolution = `${window.screen.width}x${window.screen.height}`;
        const language = navigator.language;
        const path = window.location.pathname;

        // If admin route, skip tracking
        if (path.includes('/admin')) return;

        const { data, error } = await supabase.from('page_visits').insert([
          {
            session_id: sessionId,
            user_agent: userAgent,
            screen_resolution: screenResolution,
            language: language,
            path: path,
            time_spent_seconds: 0
          },
        ]).select('id').single();

        if (!error && data) {
          visitIdRef.current = data.id;
        } else if (error) {
          console.error('Error tracking visit:', error.message);
        }
      } catch (err) {
        console.error('Failed to track visit:', err);
      }
    };

    trackVisit();

    // Setup time tracking updates
    const updateTimeSpent = async () => {
      if (!supabase || !visitIdRef.current) return;
      
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      try {
        // We use navigator.sendBeacon for reliable delivery on page unload if possible,
        // but since we are using Supabase JS client, we just do a regular await.
        // During beforeunload, this might be cancelled by the browser, but visibilitychange is more reliable.
        await supabase
          .from('page_visits')
          .update({ time_spent_seconds: timeSpent })
          .eq('id', visitIdRef.current);
      } catch (e) {
        console.error('Error updating time spent:', e);
      }
    };

    // Update time spent when user leaves the page or hides it
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        updateTimeSpent();
      }
    };

    const handleBeforeUnload = () => {
      updateTimeSpent();
    };

    // Also update periodically just in case (every 30 seconds)
    const intervalId = setInterval(() => {
      updateTimeSpent();
    }, 30000);

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(intervalId);
      updateTimeSpent(); // final update on unmount
    };
  }, []);
}
