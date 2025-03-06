import React, { useState } from 'react';
import FAIcon from '../FAIcon';
import styles from './styles.module.css';

/**
 * Chat bot component that displays a floating chat button
 * and chat window when clicked
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['chat-container']}>
      {isOpen && (
        <div className={styles['chat-window']}>
          <div className={styles['chat-header']}>
            <h3>Support Chat</h3>
            <button 
              aria-label="Close chat" 
              className={styles['chat-close']}
              onClick={toggleChat}
            >
              &times;
            </button>
          </div>
          <div className={styles['chat-messages']}>
            <div className={styles['message-system']}>
              Welcome to myTRS Help! How can we assist you?
            </div>
            <div className={styles['message-placeholder']}>
              Our team is available 9am-5pm ET, Monday-Friday.
            </div>
          </div>
          <div className={styles['chat-input']}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              aria-label="Chat message"
            />
            <button aria-label="Send message">
              <FAIcon name="arrow-right" />
            </button>
          </div>
        </div>
      )}
      <button 
        className={styles['chat-button']}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <FAIcon name="question" size="lg" />
        {!isOpen && <span>Help</span>}
      </button>
    </div>
  );
}