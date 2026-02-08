import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Ceremony from './components/Ceremony';
import Registry from './components/Registry';
import RSVP from './components/RSVP';
import Countdown from './components/Countdown';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  });

  useEffect(() => {
    // Sync with system theme changes if user hasn't manually set a theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-[var(--background)] font-sans text-[var(--text-primary)] selection:bg-champagne-gold selection:text-white transition-colors duration-300">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Hero />
              <Countdown />
              <OurStory />
              <Ceremony />
              <Registry theme={theme} />
              <RSVP theme={theme} />
            </main>

            <footer className="bg-text-dark dark:bg-black text-white py-12 text-center transition-colors duration-300">
              <p className="font-serif text-2xl mb-4">Sarah & Nelson</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-6">22 de Agosto de 2026</p>
              <p className="text-xs text-gray-600 dark:text-gray-500">
                © {new Date().getFullYear()} Wedding Landing Page. Desenvolvido por <a href="https://github.com/NelsonBenedito" target='_blank' className="text-red-500">Nelson Benedito</a>
              </p>
              <a href="/dashboard" className="text-xs text-gray-600 dark:text-gray-500 hover:text-champagne-gold transition-colors">Acessar dashboard</a>
            </footer>
          </div>
        } />
        <Route path="/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;
