import React from 'react';
import { Container } from '@mui/material';
import CalendarContainer from './components/CalendarContainer';
import './App.css';

function App() {
  return (
    <Container maxWidth="xl">
      <CalendarContainer />
    </Container>
  );
}

export default App;
