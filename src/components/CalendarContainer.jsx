import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  ListItem,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';
import EventModal from './Events/EventModal';

const CalendarContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('day');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/calendarfromtoenddate.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Transform the fetched data to match the existing events structure
        const transformedEvents = data.map(item => ({
          id: item.id,
          title: item.user_det.job_id.jobRequest_Title,
          description: item.desc,
          interviewer: item.user_det.handled_by.firstName,
          date: item.start.split('T')[0],
          startTime: new Date(item.start).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          endTime: new Date(item.end).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          link: item.link
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message || 'Failed to fetch calendar events');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate);
    switch (viewType) {
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

  const handleCloseError = () => {
    setError(null);
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} />
        <Box sx={{ color: 'text.secondary' }}>Loading calendar events...</Box>
      </Box>
    );
  }

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
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CalendarContainer; 