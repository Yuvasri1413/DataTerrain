import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  useTheme 
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [multiEvents, setMultiEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HOUR_HEIGHT = 100; // Height of each hour row in pixels
  const EVENT_WIDTH = 200; // Fixed width for event cards

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
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {/* Week Header */}
      <Grid
        container
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacing(1)
        }}
      >
        <Grid item xs={2}></Grid>
        {weekDays.map((day) => (
          <Grid item xs key={day.toISOString()}>
            <Typography variant="subtitle2" align="center">
              {format(day, 'EEE dd')}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Hours and Events */}
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <Grid
          container
          key={hour}
          sx={{
            borderBottom: `1px solid ${theme.palette.divider}`,
            height: `${HOUR_HEIGHT}px`,
            position: 'relative'
          }}
        >
          {/* Time Column */}
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: '8px'
            }}
          >
            <Typography variant="body2">
              {hour === 0 ? '12 AM' : 
               hour === 12 ? '12 PM' : 
               hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
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
                xs
                key={day.toISOString()}
                sx={{
                  position: 'relative',
                  height: '100%',
                  borderLeft: `1px solid ${theme.palette.divider}`
                }}
              >
                {hourEvents.map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      position: 'absolute',
                      top: event.top,
                      height: event.height,
                      left: '8px',
                      right: '8px',
                      maxWidth: EVENT_WIDTH,
                      zIndex: 1
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