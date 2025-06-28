import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Fab, 
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

  const [currentDate, setCurrentDate] = useState(new Date('2025-08-29'));
  const [viewType, setViewType] = useState('day');
  const [events, setEvents] = useState([
    // Day View Events (August 29th)
    {
      id: 1,
      title: 'django developer',
      description: '1st Round',
      interviewer: 'Vinodini',
      date: '2025-08-29',
      startTime: '05:00 PM',
      endTime: '06:00 PM'
    },
    {
      id: 2,
      title: 'django developer',
      description: 'Test',
      interviewer: 'Vinodini',
      date: '2025-08-29',
      startTime: '06:00 PM',
      endTime: '07:00 PM'
    },
    {
      id: 3,
      title: 'django developer',
      description: 'Interviewer',
      interviewer: 'Vinodini',
      date: '2025-08-29',
      startTime: '07:00 PM',
      endTime: '08:00 PM'
    },
    // Week View Events (March 5-11)
    {
      id: 4,
      title: 'Python Developer',
      description: 'Interviewer: Geetha',
      date: '2025-03-05',
      startTime: '10:00 AM',
      endTime: '11:00 AM'
    },
    {
      id: 5,
      title: 'Python Developer',
      description: 'Interviewer: Geetha',
      date: '2025-03-06',
      startTime: '10:00 AM',
      endTime: '11:00 AM'
    },
    {
      id: 6,
      title: 'Python Developer',
      description: 'Interviewer: Geetha',
      date: '2025-03-07',
      startTime: '10:00 AM',
      endTime: '11:00 AM'
    },
    {
      id: 7,
      title: 'Python Developer',
      description: 'Interviewer: Geetha',
      date: '2025-03-08',
      startTime: '10:00 AM',
      endTime: '11:00 AM'
    },
    {
      id: 8,
      title: 'Python Developer',
      description: 'Interviewer: Geetha',
      date: '2025-03-09',
      startTime: '10:00 AM',
      endTime: '11:00 AM'
    },
    // Month View Events (August)
    {
      id: 9,
      title: 'django developer',
      description: '1st Round',
      interviewer: 'Vinodini',
      date: '2025-08-20',
      startTime: '06:00 PM',
      endTime: '07:00 PM'
    },
    {
      id: 10,
      title: 'django developer',
      description: 'Test',
      interviewer: 'Vinodini',
      date: '2025-08-27',
      startTime: '06:00 PM',
      endTime: '07:00 PM'
    },
    {
      id: 11,
      title: 'django developer',
      description: 'Interviewer',
      interviewer: 'Vinodini',
      date: '2025-08-29',
      startTime: '06:00 PM',
      endTime: '07:00 PM'
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
    // Update current date based on view
    switch(view) {
      case 'day':
        setCurrentDate(new Date('2025-08-29'));
        break;
      case 'week':
        setCurrentDate(new Date('2025-03-05'));
        break;
      case 'month':
        setCurrentDate(new Date('2025-08-01'));
        break;
    }
    setViewType(view);
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
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          align="center"
        >
          Your Todo's
        </Typography>

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

      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{
          position: 'fixed',
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          ...(isMobile && {
            transform: 'scale(0.8)',
          }),
        }}
        onClick={() => setSelectedEvent({ date: currentDate })}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default CalendarContainer; 