import React, { useState, useRef, useEffect } from 'react';
import FAIcon from '../FAIcon';
import styles from './styles.module.css';
import chatBotService from './service';

/**
 * Chat bot component that displays a floating chat button
 * and chat window when clicked
 */
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Welcome to myTRS Help! How can we assist you?', 
      type: 'system' 
    }
  ]);
  const messagesEndRef = useRef(null);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Send message
  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      type: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Get response from service
    const response = chatBotService.findAnswer(inputText);
    
    // Add system response (with slight delay for natural feel)
    setTimeout(() => {
      const systemMessage = {
        id: messages.length + 2,
        text: response,
        type: 'system'
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 500);
    
    // Clear input
    setInputText('');
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
            {messages.map(message => (
              <div 
                key={message.id} 
                className={styles[`message-${message.type}`]}
              >
                {message.text}
              </div>
            ))}
            <div className={styles['message-placeholder']}>
              Our team is available 9am-5pm ET, Monday-Friday.
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className={styles['chat-input']}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              aria-label="Chat message"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              aria-label="Send message"
              onClick={sendMessage}
            >
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