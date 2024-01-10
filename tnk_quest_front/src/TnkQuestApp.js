import React, { useState } from 'react';
import './index.css';
import QuestSelection from './components/QuestSelection';
import AccountManagement from './components/AccountManagement';
import { Typography } from '@mui/material';

function TnkQuestApp() {
  const [isLogged, setIsLogged] = useState(false);
  const [hunter, setHunter] = useState(0);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleHunterIdSubmit = (data) => {
    setHunter(data);
  }

  const handleDeleteHunter = () => {
    setIsLogged(false);
  }

  return (
    <div className="App">
      <div className="logo">
        <Typography variant="h1" style={{ fontFamily: 'AoboshiOne-Regular', color: 'rgb(255,239,213)', fontSize: '8vh', margin: 0, padding: 0 }}>
          TnkQuest
        </Typography>
      </div>
      <div className="image-container">
      {!isLogged ? (
        <AccountManagement onLogin={handleLogin} onSubmit={handleHunterIdSubmit} />
      ) : (
        <QuestSelection hunter={hunter} deleteHunter={handleDeleteHunter} />
      )}
      </div>
    </div>
  );
}

export default TnkQuestApp;
