import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import SynthwaveAnimation from './components/SynthwaveAnimation';

const App = () => {
  return (
    <ThemeProvider>
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <SynthwaveAnimation />
      </div>
    </ThemeProvider>
  );
};

export default App;
