// src/theme/Layout/index.js
import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatBot from '@site/src/components/ChatBot';

export default function Layout(props) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <OriginalLayout {...props} />
      <ChatBot />
    </>
  );
}