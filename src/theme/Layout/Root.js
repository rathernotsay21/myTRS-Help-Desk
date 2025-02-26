// src/theme/Root.js
import React from 'react';
import ChatBot from '@site/src/components/ChatBot';

// This Root component is specially recognized by Docusaurus
// It's rendered at the very top of the React tree, before the app layout structure
export default function Root({children}) {
  return (
    <>
      {children}
      <ChatBot />
    </>
  );
}