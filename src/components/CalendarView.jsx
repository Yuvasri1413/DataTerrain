import React, { useState } from 'react';
import { Box, Popover, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Close as CloseIcon, EditOutlined as EditOutlinedIcon, DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';
import { DayView, WeekView, MonthView } from './views';
import './CalendarView.css';

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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            p: 2,
            width: {
              xs: '250px',
              sm: '300px',
              md: '350px'
            },
          }
        }}
      >
        {selectedTimeEvents.length > 0 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            maxHeight: '400px',
            overflow: 'auto',
            width: {
              xs: '95%',
              sm: '90%',
              md: '100%'
            },
            margin: '0 auto',
            px: 0,
            '&::-webkit-scrollbar': {
              width: '1px',
            },
            '&::-webkit-scrollbar-button:vertical': {
              display: 'none',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-track-piece': {
              background: 'transparent',
              height: '100%',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#1976d2',
              borderRadius: 0,
              border: 'none',
              backgroundClip: 'border-box',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#1976d2 transparent',
            '-ms-overflow-style': 'none',
          }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 1,
              borderBottom: '1px solid #e0e0e0',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontSize: '16px' }}>
                  Meetings
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={handlePopoverClose}
                sx={{
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              p: 0,
              overflowY: 'auto',
              width: '95%',
              margin: '0 auto',
              '&::-webkit-scrollbar': {
                width: '10px',
              },
              '&::-webkit-scrollbar-button:vertical': {
                display: 'none',
                height: 0,
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-track-piece': {
                background: 'transparent',
                height: '100%',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#1976d2',
                borderRadius: 0,
                border: 'none',
                backgroundClip: 'border-box',
              },
              scrollbarWidth: 'thin',
              scrollbarColor: '#1976d2 transparent',
              '-ms-overflow-style': 'none',
            }}>
              {selectedTimeEvents.map((event) => (
                <Box
                  key={event.id}
                  sx={{
                    p: 1,
                    my: 0,
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: 0,
                    position: 'relative',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10px',
                      bottom: '10px',
                      left: 0,
                      width: '10px',
                      backgroundColor: '#1976d2',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0
                    }
                  }}
                  onClick={() => {
                    onEventSelect(event);
                    handlePopoverClose();
                  }}
                >
                  <Box sx={{ p: 1, pl: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                          {event.title}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            color="inherit"
                            sx={{ marginRight: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add edit logic here
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add delete logic here
                            }}
                          >
                            <DeleteOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="black">
                        {event.description} | Interviewer: {event.interviewer}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Date: {format(parseISO(event.date), 'dd MMM yyyy')} | Time: {event.startTime} - {event.endTime}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default CalendarView; 