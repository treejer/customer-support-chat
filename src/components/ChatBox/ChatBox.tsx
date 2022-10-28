// @ts-nocheck
import React, {useEffect, useState} from 'react';

import {ActivityIndicator} from '../ActivityIndicator/ActivityIndicator';
import styles from './ChatBox.module.css';
import {RangerLogo} from '../../assets/images';

export function ChatBox() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const widgetChecker = setInterval(() => {
      if (window?.HubSpotConversations) {
        const status = window?.HubSpotConversations?.widget?.status();
        const loaded = status.loaded && !status.pending;
        if (loaded) {
          window?.HubSpotConversations?.widget?.open();
          setLoading(!loaded);
          clearInterval(widgetChecker);
        }
      }
    }, 200);
  }, []);

  const handleOpenChatBox = () => {
    window?.HubSpotConversations?.widget?.open();
  };

  return (
    <div className={styles.container}>
      <div className={styles['flex-col']}>
        <p className={styles.ranger}>Customer Support Chat</p>
        <img src={RangerLogo} alt="Ranger Treejer logo" style={{width: 240, height: 240}} />
        <p className={styles.ranger}>Ranger App</p>
        <p className={styles.by}>by Treejer</p>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <button className={styles.chatBtn} onClick={handleOpenChatBox}>
            Got any question?
          </button>
        )}
      </div>
    </div>
  );
}
