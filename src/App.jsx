import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';

function App() {
  return (
    <div className="min-h-screen bg-wedding-white font-sans text-text-dark selection:bg-champagne-gold selection:text-white">
      {/* <Header /> */}
      <main>
        <Hero />
        <OurStory />
      </main>
    </div>
  );
}

export default App;
