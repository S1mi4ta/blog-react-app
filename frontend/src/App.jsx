// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header /> {/* Renders the Header component */}
      <Container className='my-2'>
        <Outlet /> {/* Renders nested routes defined in Router */}
      </Container>
    </div>
  );
}

export default App;
