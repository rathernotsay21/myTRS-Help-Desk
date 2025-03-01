// src/components/ChatBot/index.js
import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import chatBotService from './service';

// Define initial messages outside of the component
const initialMessages = [
  { 
    text: "👋 Hi there! I'm the myTRS Assistant. How can I help you today?", 
    sender: 'bot' 
  },
  {
    text: "Here are some things you can ask me about:",
    sender: 'bot'
  },
  {
    text: "• How to use the dashboard",
    sender: 'bot',
    isQuickQuestion: true,
    question: "How do I use the dashboard?"
  },
  {
    text: "• How to generate reports",
    sender: 'bot',
    isQuickQuestion: true,
    question: "How do I generate reports?"
  },
  {
    text: "• How to create transactions",
    sender: 'bot',
    isQuickQuestion: true,
    question: "How do I create transactions?"
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResponseIndex, setLastResponseIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const {siteConfig} = useDocusaurusContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load chat history from localStorage only on client side
  useEffect(() => {
    if (isClient) {
      try {
        const savedMessages = localStorage.getItem('myTRSChatHistory');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, [isClient]);
  
  // Update dark mode detection when mounted and when it changes
  useEffect(() => {
    if (!isClient) return;
    
    const updateTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setIsDarkMode(isDark);
    };
    
    // Initial check
    updateTheme();
    
    // Set up observer for theme changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, [isClient]);
  
  // Scroll to the bottom of the chat when new messages appear
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isClient && messages.length > 0) {
      try {
        localStorage.setItem('myTRSChatHistory', JSON.stringify(messages.slice(-50))); // Keep last 50 messages
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
      scrollToBottom();
    }
  }, [messages, isClient]);
  
  // Handle chat initialization when opened
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Use the chatbot service to generate responses
  const generateResponse = (userQuery) => {
    // Get answer from our service
    return chatBotService.findAnswer(userQuery);
  };

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowFeedback(false); // Hide any previous feedback UI
    
    // Simulate AI response delay (would be replaced with actual API call)
    setTimeout(() => {
      const botResponse = { text: generateResponse(inputValue), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      setLastResponseIndex(messages.length + 1); // Set the index for the feedback
      setIsLoading(false);
      setShowFeedback(true); // Show feedback options after response
    }, 1000);
  };
  
  // Handle quick question selection
  const handleQuickQuestion = (question) => {
    // Add user message with the pre-defined question
    const userMessage = { text: question, sender: 'user' };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setShowFeedback(false);
    
    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = { text: generateResponse(question), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
      setLastResponseIndex(messages.length + 1);
      setIsLoading(false);
      setShowFeedback(true);
    }, 1000);
  };
  
  // Handle feedback submission
  const handleFeedback = (isHelpful) => {
    // In a real implementation, you would send this feedback to your analytics or training system
    const feedbackMessage = { 
      text: isHelpful ? "Thanks for your feedback! I'm glad that was helpful." : "I'm sorry my answer wasn't helpful. Let me improve my response.",
      sender: 'bot',
      isFeedback: true
    };
    
    setMessages(prev => [...prev, feedbackMessage]);
    setShowFeedback(false);
    
    // If the answer wasn't helpful, suggest contacting support
    if (!isHelpful) {
      setTimeout(() => {
        const supportMessage = {
          text: "For more detailed assistance, please contact our support team at support@my-trs.com",
          sender: 'bot'
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };
  
  // Clear chat history
  const clearChat = () => {
    if (!isClient) return;
    
    const confirmClear = window.confirm("Are you sure you want to clear your chat history?");
    if (confirmClear) {
      setMessages(initialMessages);
      try {
        localStorage.removeItem('myTRSChatHistory');
      } catch (error) {
        console.error('Error clearing chat history:', error);
      }
    }
  };

  // Toggle chatbot open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // If not client-side yet, render a simplified version without localStorage dependency
  if (!isClient) {
    return (
      <div className={styles.chatbotContainer}>
        <button 
          className={styles.chatButton} 
          onClick={toggleChat}
          aria-label="Open chat assistant"
        >
          <svg className={styles.chatIcon} viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
            <path fill="currentColor" d="M12 6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 10c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 14c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.chatbotContainer} ${isDarkMode ? styles.dark : ''}`}>
      {/* Chat button */}
      <button 
        className={styles.chatButton} 
        onClick={toggleChat}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <span className={styles.closeIcon}>×</span>
        ) : (
          <svg className={styles.chatIcon} viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
            <path fill="currentColor" d="M12 6.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 10c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 14c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
          </svg>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>myTRS Assistant</h3>
            <div className={styles.headerButtons}>
              <button 
                className={styles.clearButton} 
                onClick={clearChat}
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
              <button 
                className={styles.minimizeButton} 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <div key={index}>
                {message.isQuickQuestion ? (
                  <button 
                    className={`${styles.message} ${styles.botMessage} ${styles.quickQuestion}`}
                    onClick={() => handleQuickQuestion(message.question)}
                  >
                    {message.text}
                  </button>
                ) : (
                  <div 
                    className={`${styles.message} ${
                      message.sender === 'bot' 
                        ? message.isFeedback 
                          ? styles.feedbackMessage 
                          : styles.botMessage 
                        : styles.userMessage
                    }`}
                  >
                    {message.text}
                  </div>
                )}
                
                {/* Feedback buttons after bot response (not for feedback messages) */}
                {showFeedback && 
                 index === lastResponseIndex && 
                 message.sender === 'bot' && 
                 !message.isFeedback && (
                  <div className={styles.feedbackButtons}>
                    <span>Was this helpful?</span>
                    <div>
                      <button 
                        onClick={() => handleFeedback(true)}
                        aria-label="This answer was helpful"
                        className={styles.thumbsButton}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleFeedback(false)}
                        aria-label="This answer was not helpful"
                        className={styles.thumbsButton}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path fill="currentColor" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage} ${styles.loadingMessage}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className={styles.chatInput} onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              aria-label="Chat message input"
            />
            <button type="submit" aria-label="Send message">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}