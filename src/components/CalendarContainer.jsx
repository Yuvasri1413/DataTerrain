import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  ListItem, 
  useMediaQuery, 
  useTheme 
} from '@mui/material';
import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';
import EventModal from './Events/EventModal';

const CalendarContainer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('day');
  const [events, setEvents] = useState([
    // {
    //   id: 1,
    //   title: 'django developer',
    //   description: '1st Round',
    //   interviewer: 'Vinodini',
    //   date: '2025-06-29',
    //   startTime: '05:00 AM',
    //   endTime: '08:00 AM'

    // },
    // {
    //   id: 2,
    //   title: 'django developer',
    //   description: '1st Round',
    //   interviewer: 'Vinodini',
    //   date: '2025-06-29',
    //   startTime: '05:00 AM',
    //   endTime: '08:00 AM'
    // },
    // {
    //   id: 3,
    //   title: 'django developer',
    //   description: '1st Round',
    //   interviewer: 'Vinodini',
    //   date: '2025-06-30',
    //   startTime: '06:00 AM',
    //   endTime: '07:00 AM'
    // },
    // {
    //   date: "2025-07-02",
    //   description: "3rd Round",
    //   endTime: "01:00 PM",
    //   id: 4,
    //   // interviewVia: "https://meet.google.com/landing",
    //   interviewer: "Vinodhini",
    //   startTime: "12:00 PM",
    //   title: "django developer"
    // }

  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/calendarfromtoenddate.json');
        const data = await response.json();
        console.log('Fetched Events:', data);

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

        console.log('Transformed Events:', transformedEvents);
        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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

    </Container>
  );
};

export default CalendarContainer; 