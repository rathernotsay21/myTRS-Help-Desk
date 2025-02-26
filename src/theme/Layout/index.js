// src/theme/Layout/index.js
import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ChatBot from '@site/src/components/ChatBot';

export default function Layout(props) {
  // Add console log for debugging
  console.log('Custom Layout rendering with ChatBot');
  
  return (
    <>
      <OriginalLayout {...props} />
      <ChatBot />
    </>
  );
}