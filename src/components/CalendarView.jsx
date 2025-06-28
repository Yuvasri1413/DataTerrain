import React, { useState } from 'react';
import { Box, Popover, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Close as CloseIcon, EditOutlined as EditOutlinedIcon, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { DayView, WeekView, MonthView } from './views';
import './CalendarView.css';
import MultiEventView from './Events/MultiEventView';
import MultiEventPopover from './Events/MultiEventPopover';

const CalendarView = ({ currentDate, viewType, events, onEventSelect, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTimeEvents, setSelectedTimeEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleEventClick = (event, target, eventsAtTime) => {
    // Only show popover if there are multiple events at the same time
    if (eventsAtTime.length > 1) {
      setSelectedTimeEvents(eventsAtTime);
      setAnchorEl(target);
    } else {
      // If only one event, directly select it
      onEventSelect(event);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedTimeEvents([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'event-popover' : undefined;

  const renderView = () => {
    switch (viewType) {
      case 'day': 
        return <DayView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />;
      case 'week': 
        return <WeekView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />;
      case 'month': 
        return <MonthView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />;
      default: 
        return <DayView 
          currentDate={currentDate} 
          events={events} 
          onEventClick={handleEventClick} 
        />;
    }
  };

  // Generate hours for the day view
  const generateHours = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const hourString = hour === 0 ? '12 AM' : 
                         hour < 12 ? `${hour} AM` : 
                         hour === 12 ? '12 PM' : 
                         `${hour - 12} PM`;
      return hourString;
    });
  };

  // Filter events for the current date
  const filterEventsForCurrentDate = () => {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    return events.filter(event => 
      event.date === formattedDate
    );
  };

  // Render events for day view
  const renderDayEvents = () => {
    const dayEvents = filterEventsForCurrentDate();
    
    return generateHours().map((hourLabel, index) => (
      <Box 
        key={hourLabel} 
        sx={{ 
          display: 'flex', 
          borderBottom: `1px solid ${theme.palette.divider}`,
          minHeight: isMobile ? '40px' : '60px',
          position: 'relative'
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ 
            width: '60px', 
            padding: theme.spacing(1),
            textAlign: 'right',
            color: theme.palette.text.secondary,
            fontSize: isMobile ? '0.7rem' : '0.8rem'
          }}
        >
          {hourLabel}
        </Typography>
        
        <Box 
          sx={{ 
            flex: 1, 
            position: 'relative',
            borderLeft: `1px solid ${theme.palette.divider}`
          }}
        >
          {dayEvents
            .filter(event => {
              const eventStartHour = parseInt(event.startTime.split(':')[0]);
              const eventStartPeriod = event.startTime.includes('PM') ? 12 : 0;
              const adjustedStartHour = eventStartHour + eventStartPeriod;
              return adjustedStartHour === index;
            })
            .map((event, eventIndex) => (
              <Box 
                key={event.id}
                onClick={() => onEventSelect(event)}
                sx={{
                  position: 'absolute',
                  width: '100%',
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.contrastText,
                  padding: theme.spacing(0.5),
                  borderRadius: 1,
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  top: `${eventIndex * 30}px`,
                  zIndex: 10,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              >
                {event.title} - {event.startTime}
              </Box>
            ))
          }
        </Box>
      </Box>
    ));
  };

  return (
    <Box 
      sx={{
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
    >
      {renderView()}

      <MultiEventPopover
        anchorEl={anchorEl}
        open={open}
        id={id}
        handlePopoverClose={handlePopoverClose}
      >
        {selectedTimeEvents.length > 0 && (
          <MultiEventView 
            events={selectedTimeEvents}
            onEventSelect={onEventSelect}
            onClose={handlePopoverClose}
            onEdit={(event) => {
              // Implement edit logic
              console.log('Edit event', event);
            }}
            onDelete={(event) => {
              // Implement delete logic
              console.log('Delete event', event);
            }}
          />
        )}
      </MultiEventPopover>
    </Box>
  );
};

export default CalendarView; 