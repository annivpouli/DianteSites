import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import QuoteRequest from './pages/QuoteRequest';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/quote-request" element={<QuoteRequest />} />
      </Routes>
    </HashRouter>
  );
}

export default App;