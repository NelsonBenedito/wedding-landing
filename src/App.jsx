import React from 'react';

// Minimal test version - no external dependencies
function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFEF9',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '1rem' }}>
        Sarah & Nelson
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#D4AF37', marginBottom: '2rem' }}>
        22 de Agosto de 2026
      </p>
      <p style={{ color: '#666' }}>
        Se você está vendo esta mensagem, o React está funcionando!
      </p>
    </div>
  );
}

export default App;
