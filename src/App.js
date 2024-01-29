// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TelegramMessage from './components/TelegramMessage';
import { TodoWrapper } from './components/TodoWrapper';
import { Container } from '@mui/material';

function App() {
  return (
    <Container className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoWrapper />} />
          <Route path="/telegram" element={<TelegramMessage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
