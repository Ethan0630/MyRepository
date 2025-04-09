import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // ✅ 一次匯入就好
import './index.css';

import App from './App.jsx';
import Login from './Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />     {/* 登入頁 */}
        <Route path="/home/*" element={<App />} />   {/* 主頁面 */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
