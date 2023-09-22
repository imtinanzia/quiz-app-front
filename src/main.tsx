import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@app/app';
import '@app/index.css';
import "../public/fonts/inter/stylesheet.css"
import '/node_modules/react-modal-video/scss/modal-video.scss';
import { AuthProvider } from './context';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <AuthProvider><App /></AuthProvider>
    </BrowserRouter>
);
