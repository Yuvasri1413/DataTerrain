import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  useTheme,
  Badge,
  useMediaQuery
} from '@mui/material';
import { 
  format, 
  parseISO, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';
import MainEventView from '../Events/MainEventView';
import MultiEventView from '../Events/MultiEventView';
import MultiEventPopover from '../Events/MultiEventPopover';
import EventModal from '../Events/EventModal';

const MonthView = ({ 
  currentDate, 
  events, 
  onEventClick,
  onEditEvent,
  onDeleteEvent
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [multiEvents, setMultiEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate month details
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  // Generate calendar days
  const monthDays = [];
  let currentDay = startDate;

  while (currentDay <= endDate) {
    monthDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Get grid size based on screen size
  const getGridItemSize = () => {
    if (isSmallScreen) return 12; // Full width on small screens
    return 12/7; // 7 columns on larger screens
  };

  const handleEventClick = (event, target, similarEvents) => {
    if (similarEvents && similarEvents.length > 1) {
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
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Week Days Header */}
      <Grid
        container
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.grey[100],
          display: { xs: 'none', md: 'flex' } // Hide on small screens
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <Grid 
            item 
            xs={12/7}
            key={day}
            sx={{
              textAlign: 'center',
              padding: theme.spacing(1),
              fontWeight: 'bold'
            }}
          >
            <Typography variant="subtitle2" align="center">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Month Grid */}
      <Grid 
        container 
        sx={{
          width: '100%',
          height: isSmallScreen ? 'auto' : 'calc(100% - 50px)',
          mt: isSmallScreen ? 1 : 0
        }}
      >
        {monthDays.map((day, index) => {
          const isCurrentMonth = 
            day.getMonth() === currentDate.getMonth() && 
            day.getFullYear() === currentDate.getFullYear();

          const dayEvents = events.filter(event => {
            try {
              const eventDate = parseISO(event.start || event.date);
              return format(eventDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
            } catch {
              return false;
            }
          });

          return (
            <Grid
              item
              xs={getGridItemSize()}
              key={index}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                minHeight: isSmallScreen ? '80px' : '100px',
                height: isSmallScreen ? 'auto' : '150px',
                position: 'relative',
                backgroundColor: !isCurrentMonth ? theme.palette.grey[100] : 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: {
                  xs: 1,
                  sm: 1,
                  md: theme.spacing(1)
                },
                '@media (width: 1024px)': {
                  padding: 0.25,
                  minHeight: '90px',
                  height: '120px'
                }
              }}
            >
              {/* Day Number with Date for Small Screens */}
              <Typography
                variant="body2"
                sx={{
                  position: isSmallScreen ? 'relative' : 'absolute',
                  top: isSmallScreen ? 0 : theme.spacing(0.5),
                  right: isSmallScreen ? 'auto' : theme.spacing(0.5),
                  color: !isCurrentMonth ? theme.palette.text.disabled : 'inherit',
                  fontWeight: isCurrentMonth ? 'bold' : 'normal',
                  mb: isSmallScreen ? 1 : 0,
                  width: '100%',
                  textAlign: isSmallScreen ? 'left' : 'right',
                  pl: isSmallScreen ? 1 : 0
                }}
              >
                {isSmallScreen 
                  ? `${format(day, 'EEE')}, ${day.getDate()}`
                  : day.getDate()}
              </Typography>

              {/* Events */}
              {dayEvents.length > 0 && (
                <Box 
                  sx={{ 
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    '@media (width: 1024px)': {
                      padding: '0 2px'
                    },
                    marginTop: isSmallScreen ? 0 : {
                      xs: '25px',
                      sm: '30px',
                      md: '35px',
                      '@media (width: 1024px)': {
                        marginTop: '28px'
                      }
                    }
                  }}
                >
                  <MainEventView
                    key={dayEvents[0].id}
                    event={dayEvents[0]}
                    currentDate={day}
                    events={dayEvents}
                    view="month"
                    onEventClick={(event, target) => {
                      if (dayEvents.length > 1) {
                        setMultiEvents(dayEvents);
                        setAnchorEl(target);
                      } else {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }
                    }}
                  />
                </Box>
              )}
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

export default MonthView; 