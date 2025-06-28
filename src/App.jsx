import React from 'react';
import { Container } from '@mui/material';
import CalendarContainer from './components/CalendarContainer';
import './App.css';
// import DUMMY from './components/DUMMY';

function App() {
  return (
    <Container maxWidth="xl">
      <CalendarContainer />
      {/* <DUMMY /> */}
    </Container>
  );
}

export default App;
