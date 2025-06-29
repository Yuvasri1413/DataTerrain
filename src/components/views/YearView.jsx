import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  format 
} from 'date-fns';
import MainEventView from '../Events/MainEventView';
import MultiEventPopover from '../Events/MultiEventPopover';
import MultiEventView from '../Events/MultiEventView';
import EventModal from '../Events/EventModal';

const YearPreview = ({ date, events, onEventClick, onEditEvent, onDeleteEvent }) => {
  const theme = useTheme();
  
  // Group events for this month
  const monthEvents = events.filter(event => {
    try {
      const eventDate = new Date(event.start || event.date);
      return format(eventDate, 'yyyy-MM') === format(date, 'yyyy-MM');
    } catch {
      return false;
    }
  });

  // Sort events by start time
  const sortedMonthEvents = monthEvents.sort((a, b) => {
    const dateA = new Date(a.start || a.date);
    const dateB = new Date(b.start || b.date);
    return dateA - dateB;
  });

  return (
    <Paper
      elevation={2}
      sx={{
        width: '100%',
        height: '150px',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 0.5,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'auto'
      }}
    >
      {/* Month Name */}
      <Typography 
        variant="h6" 
        sx={{ 
          position: 'absolute',
          top: 8,
          left: 0,
          right: 0,
          textAlign: 'center',
          textTransform: 'capitalize',
          fontSize: '1rem',
          letterSpacing: 1,
        }}
      >
        {format(date, 'MMM')}
      </Typography>

      {/* Events */}
      <Box 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '30px',
          overflowY: 'auto',
        }}
      >
        {sortedMonthEvents.length > 0 && (
          <MainEventView
            event={sortedMonthEvents[0]}
            currentDate={date}
            events={events}
            view="year"
            onEventClick={(event, target) => {
              if (sortedMonthEvents.length > 0) {
                // Always show popover for month events
                onEventClick(event, target, sortedMonthEvents);
              } else {
                // If no events, open modal or handle event click
                onEventClick(event, target);
              }
            }}
          />
        )}
      </Box>
    </Paper>
  );
};

const YearView = ({ 
  currentDate = new Date(), 
  events = [], 
  onEventClick,
  onEditEvent,
  onDeleteEvent
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [multiEvents, setMultiEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    try {
      const eventDate = new Date(event.start || event.date);
      const monthKey = format(eventDate, 'yyyy-MM');
      
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(event);
    } catch (error) {
      console.error('Error grouping events:', error);
    }
    return acc;
  }, {});

  // Generate 12 months for the current year
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentDate.getFullYear(), i, 1);
    return date;
  });

  // Determine grid item size based on screen size
  const getGridItemSize = () => {
    if (isSmallScreen) return 12;  // 1 column on small screens
    if (isMediumScreen) return 4;  // 3 columns on medium screens
    return 3;                      // 4 columns on large screens
  };

  const handleEventClick = (event, target, similarEvents) => {
    if (similarEvents && similarEvents.length > 0) {
      setMultiEvents(similarEvents);
      setAnchorEl(target);
    } else {
      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleMultiEventSelect = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setAnchorEl(null);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setMultiEvents([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Grid 
        container 
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        {months.map((month, index) => {
          const monthKey = format(month, 'yyyy-MM');
          const monthSpecificEvents = groupedEvents[monthKey] || [];

          return (
            <Grid 
              item 
              xs={getGridItemSize()}
              key={index}
              sx={{
                minHeight: '100px',
                height: '150px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <YearPreview 
                date={month} 
                events={monthSpecificEvents} 
                onEventClick={handleEventClick}
                onEditEvent={onEditEvent}
                onDeleteEvent={onDeleteEvent}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Multi Event Popover */}
      <MultiEventPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        id="multi-event-popover"
        handlePopoverClose={handleClosePopover}
      >
        <MultiEventView
          events={multiEvents}
          onEventSelect={handleMultiEventSelect}
          onClose={handleClosePopover}
          onEdit={(event) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
            handleClosePopover();
          }}
          onDelete={onDeleteEvent}
        />
      </MultiEventPopover>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onEdit={(updatedEvent) => {
            onEditEvent(updatedEvent);
            handleCloseModal();
          }}
          onDelete={() => {
            onDeleteEvent(selectedEvent);
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default YearView;