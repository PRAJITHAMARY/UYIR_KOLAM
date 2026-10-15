/**
 * UYIR KOLAM - ROOT APPLICATION
 * Navigates seamlessly between Welcome Screen, Creation Studio, and About Screen.
 */

import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import StudioView from './components/StudioView';
import AboutScreen from './components/AboutScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'studio' | 'about'

  return (
    <div className="uyir-kolam-app" style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onBegin={() => setCurrentScreen('studio')}
          onOpenStory={() => setCurrentScreen('about')}
        />
      )}

      {currentScreen === 'studio' && (
        <StudioView
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onOpenAbout={() => setCurrentScreen('about')}
        />
      )}

      {currentScreen === 'about' && (
        <AboutScreen
          onBack={() => setCurrentScreen('welcome')}
        />
      )}
    </div>
  );
}
