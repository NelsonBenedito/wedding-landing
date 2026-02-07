import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Ceremony from './components/Ceremony';
import Registry from './components/Registry';
import RSVP from './components/RSVP';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-wedding-white font-sans text-text-dark selection:bg-champagne-gold selection:text-white">
            <Header />
            <main>
              <Hero />
              <OurStory />
              <Ceremony />
              <Registry />
              <RSVP />
            </main>

            <footer className="bg-text-dark text-white py-12 text-center">
              <p className="font-serif text-2xl mb-4">Sarah & Nelson</p>
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-6">22 de Agosto de 2026</p>
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} Wedding Landing Page. Desenvolvido por <a href="https://github.com/NelsonBenedito" target='_blank' className="text-red-500">Nelson Benedito</a>
              </p>
              <p>© {new Date().getFullYear()} Desenvolvido por </p>
            </footer>
          </div>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
