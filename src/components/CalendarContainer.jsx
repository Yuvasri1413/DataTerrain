import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';
import EventModal from './EventModal';
// import './CalendarContainer.css';

const CalendarContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('day');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'django developer',
      description: '1st Round',
      interviewer: 'Vinodini',
      date: '2025-06-29',
      startTime: '05:00 AM',
      endTime: '08:00 AM'
    },
    {
      id: 2,
      title: 'django developer',
      description: 'Interviewer',
      interviewer: 'Vinodini',
      date: '2025-06-29',
      startTime: '05:00 AM',
      endTime: '08:00 AM'
    },
    {
      id: 3,
      title: 'django developer',
      description: 'Test',
      interviewer: 'Vinodini',
      date: '2025-06-29',
      startTime: '07:00 AM',
      endTime: '09:00 AM'
    },
    {
      id: 4,
      title: 'django developer',
      description: 'Test',
      interviewer: 'Vinodini',
      date: '2025-07-01',
      startTime: '05:00 AM',
      endTime: '08:00 AM'
    },
    {
      id: 5,
      title: 'django developer',
      description: 'Test',
      interviewer: 'Vinodini',
      date: '2025-07-03',
      startTime: '05:00 PM',
      endTime: '06:00 PM'
    }
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate);
    switch(viewType) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const handleViewChange = (view) => {
    setViewType(view);
    // Keep the current date for day view
    if (view === 'day') {
      setCurrentDate(new Date());
    }
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setSelectedEvent(null);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  return (
    <Container 
      width="100%"
      maxWidth="xl" 
      sx={{ 
        py: 2,
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2 
      }}>

        <CalendarHeader 
          currentDate={currentDate}
          viewType={viewType}
          onDateChange={handleDateChange}
          onViewChange={handleViewChange}
        />

        <CalendarView 
          currentDate={currentDate}
          viewType={viewType}
          events={events}
          onEventSelect={setSelectedEvent}
        />
      </Box>

      {selectedEvent !== null && (
        <EventModal 
          event={selectedEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

    </Container>
  );
};

export default CalendarContainer; 