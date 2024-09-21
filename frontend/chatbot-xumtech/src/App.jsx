import React, { useState } from 'react';
import '../src/styles.scss';
import Chatbot from './components/Chatbot';
import UnsolvedManager from './components/UnsolvedManager';

export default function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showUnsolvedManager, setShowUnsolvedManager] = useState(false);

  return (
    <>
      <img style={{ maxWidth: '25%', paddingLeft: '25%' }} src="/banking.svg" alt="SVG LOGO" />
      <div className="button-container">
        <button className="right-button" onClick={() => {
          setShowChatbot(true)
          setShowUnsolvedManager(false)
        }
          }>Chatbot</button>
        <button className="right-button" onClick={() => {
          setShowChatbot(true)
          setShowUnsolvedManager(false)
        }}>Unsolved Manager</button>
      </div>

      {/* Conditionally rendering components */}
      {showChatbot && (
        <div className="modal">
          <Chatbot />
          <button className="close-button" onClick={() => setShowChatbot(false)}>Cerrar</button>
        </div>
      )}
      
      {showUnsolvedManager && (
        <div className="modal">
          <UnsolvedManager />
          <button className="close-button" onClick={() => setShowUnsolvedManager(false)}>Cerrar</button>
        </div>
      )}
    </>
  );
}
