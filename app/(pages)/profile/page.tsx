'use client'

import { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import LoginPopup from './_components/LoginPopup';
import PlaylistSection from './_components/PlaylistSection';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setShowLogin(false);
    }else{
      setShowLogin(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowLogin(true);
  };

  return (
      <div>
        {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
        <div className={styles.container}>
          {user && (
            <div className={styles.profileContent}>
              <div className={styles.profileHeader}>
                <h1>Welcome, {user.username}</h1>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Log Out
                </button>
              </div>
              <PlaylistSection userId={user.id} />
            </div>
          )}
        </div>
      </div>
  );
}