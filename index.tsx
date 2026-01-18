
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Application Render Error:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">应用启动失败，请检查控制台。</div>`;
  }
} else {
  console.error("Root element not found");
}
