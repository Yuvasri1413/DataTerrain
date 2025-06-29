import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  format, 
  parseISO, 
  startOfWeek, 
  addDays,
  isWithinInterval,
  startOfDay,
  endOfDay,
  parse,
  differenceInMinutes,
  max
} from 'date-fns';
import MainEventView from '../Events/MainEventView';
import MultiEventView from '../Events/MultiEventView';
import MultiEventPopover from '../Events/MultiEventPopover';
import EventModal from '../Events/EventModal';

const WeekView = ({ 
  currentDate, 
  events, 
  onEventClick,
  onEditEvent,
  onDeleteEvent
}) => {
  const theme = useTheme();
  const is1024Screen = useMediaQuery('(width: 1024px)');
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [multiEvents, setMultiEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HOUR_HEIGHT = is1024Screen ? 65 : isTablet ? 70 : 100;
  const EVENT_WIDTH = is1024Screen ? 130 : isTablet ? '100%' : 200;

  // Calculate week start and days
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Process events for each day
  const processedEventsByDay = weekDays.reduce((acc, day) => {
    const dayKey = format(day, 'yyyy-MM-dd');
    
    // Group events by start time for this day
    const groupedEvents = events
      .filter(event => format(parseISO(event.date), 'yyyy-MM-dd') === dayKey)
      .reduce((groups, event) => {
        const startDateTime = parse(event.startTime, 'h:mm a', new Date());
        const startTimeKey = format(startDateTime, 'HH:mm');
        
        if (!groups[startTimeKey]) {
          groups[startTimeKey] = {
            events: [],
            startHour: startDateTime.getHours(),
            startMinutes: startDateTime.getMinutes(),
            maxEndDateTime: parse(event.endTime, 'h:mm a', new Date())
          };
        }
        
        const endDateTime = parse(event.endTime, 'h:mm a', new Date());
        groups[startTimeKey].events.push(event);
        groups[startTimeKey].maxEndDateTime = max([groups[startTimeKey].maxEndDateTime, endDateTime]);
        
        return groups;
      }, {});

    // Convert grouped events to positioned events
    acc[dayKey] = Object.values(groupedEvents).map(group => {
      const durationMinutes = differenceInMinutes(group.maxEndDateTime, 
        new Date().setHours(group.startHour, group.startMinutes));

      return {
        ...group.events[0],
        allEvents: group.events,
        startHour: group.startHour,
        startMinutes: group.startMinutes,
        top: group.startMinutes / 60 * HOUR_HEIGHT,
        height: Math.max((durationMinutes / 60) * HOUR_HEIGHT, 40), // Minimum height of 40px
        durationMinutes
      };
    });

    return acc;
  }, {});
  

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
      overflowX: 'hidden',
      overflowY: 'auto',
      '& .MuiGrid-container': {
        width: '100%',
        margin: 0,
        maxWidth: '100%'
      },
      '& .MuiGrid-item': {
        padding: theme.spacing(0.5),
        minWidth: 0
      }
    }}>
      {/* Week Header - Only show on desktop */}
      {!isTablet && (
        <Grid
          container
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            marginBottom: theme.spacing(0.5),
            width: '100%',
            '& .MuiGrid-item': {
              flexShrink: 1,
              width: 'auto'
            }
          }}
        >
          <Grid 
            item 
            xs={1}
            sx={{
              minWidth: is1024Screen ? '40px' : '60px',
              maxWidth: is1024Screen ? '40px' : '60px'
            }}
          />
          {weekDays.map((day) => (
            <Grid 
              item 
              xs 
              key={day.toISOString()}
              sx={{
                flexGrow: 1,
                flexBasis: 0
              }}
            >
              <Typography 
                variant="subtitle2" 
                align="center"
                noWrap
                sx={{
                  fontSize: is1024Screen ? '0.7rem' : '0.875rem'
                }}
              >
                {format(day, 'EEE dd')}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Hours and Events */}
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <Grid
          container
          key={hour}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            minHeight: `${HOUR_HEIGHT}px`,
            position: 'relative',
            flexDirection: isTablet ? 'column' : 'row'
          }}
        >
          {/* Time Column */}
          <Grid
            item
            xs={isTablet ? 12 : 1}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isTablet ? 'flex-start' : 'flex-start',
              paddingLeft: isTablet ? 2 : 1,
              borderRight: isTablet ? 'none' : `1px solid ${theme.palette.divider}`,
              backgroundColor: isTablet ? 'transparent' : 'transparent',
              minWidth: isTablet ? 'auto' : '60px',
              position: isTablet ? 'sticky' : 'relative',
              left: isTablet ? 0 : 'auto',
              zIndex: isTablet ? 1 : 'auto'
            }}
          >
            <Typography 
              variant="body2"
              sx={{
                fontWeight: 'normal',
                fontSize: isTablet ? '0.9rem' : '0.875rem'
              }}
            >
              {hour === 0 ? '12 AM' : 
               hour === 12 ? '12 PM' : 
               hour < 12 ? `${hour} AM` : `${hour-12} PM`}
            </Typography>
          </Grid>

          {/* Days Columns */}
          {weekDays.map((day) => {
            const dayKey = format(day, 'yyyy-MM-dd');
            const dayEvents = processedEventsByDay[dayKey] || [];
            const hourEvents = dayEvents.filter(event => event.startHour === hour);

            return (
              <Grid
                item
                xs={isTablet ? 12 : true}
                key={day.toISOString()}
                sx={{
                  position: 'relative',
                  minHeight: isTablet ? 'auto' : '100%',
                  borderLeft: isTablet ? 'none' : `1px solid ${theme.palette.divider}`,
                  display: isTablet ? 'flex' : 'block',
                  flexDirection: isTablet ? 'column' : 'row',
                  alignItems: isTablet ? 'center' : 'stretch',
                  justifyContent: isTablet ? 'center' : 'flex-start',
                  pl: isTablet ? 2 : 1,
                  pr: isTablet ? 2 : 1,
                  pt: isTablet ? 1 : 0,
                  pb: isTablet ? 1 : 0
                }}
              >
                {hourEvents.map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      position: isTablet ? 'relative' : 'absolute',
                      top: isTablet ? 0 : event.top,
                      height: isTablet ? 'auto' : event.height,
                      width: isTablet ? '80%' : EVENT_WIDTH,
                      margin: isTablet ? '0 auto' : 0,
                      mb: isTablet ? 1 : 0,
                      '@media (width: 1024px)': {
                        left: '2px',
                        right: '2px',
                        maxWidth: 'calc(100% - 4px)'
                      }
                    }}
                  >
                    <MainEventView
                      event={event}
                      currentDate={day}
                      events={event.allEvents}
                      onEventClick={handleEventClick}
                      view="week"
                      duration={event.durationMinutes}
                    />
                  </Box>
                ))}
              </Grid>
            );
          })}
        </Grid>
      ))}

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

export default WeekView; 