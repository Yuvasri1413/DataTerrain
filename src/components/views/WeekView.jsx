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
  endOfDay
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

  // Calculate week start and days
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Helper function to convert time to 24-hour format for consistent comparison
  const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) return null;
    
    // Remove spaces and convert to uppercase
    const cleanedTime = timeStr.replace(/\s/g, '').toUpperCase();
    
    // Parse hours and period
    const match = cleanedTime.match(/(\d+):?(\d*)(AM|PM)?/);
    if (!match) return null;
    
    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    minutes = minutes ? parseInt(minutes, 10) : 0;
    
    // Adjust hours for PM
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    // Adjust hours for 12 AM
    if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours;
  };

  // Helper function to format hour display
  const formatHourDisplay = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour > 12 
      ? `${hour - 12} PM` 
      : `${hour} AM`;
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
            minHeight: '100px'
          }}
        >
          {/* Time Column */}
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body2">
              {formatHourDisplay(hour)}
            </Typography>
          </Grid>

          {/* Days Columns */}
          {weekDays.map((day) => (
            <Grid
              item
              xs
              key={day.toISOString()}
              sx={{
                position: 'relative',
                minHeight: '100px',
                borderLeft: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
                padding: '10px',
              }}
            >
              {(() => {
                // Create a Set to track unique events
                const uniqueEventKeys = new Set();

                // Filter events for this day and hour
                const filteredEvents = events
                  .filter((event) => {
                    // Try parsing the date from different possible formats
                    let eventDate;
                    try {
                      // First try parsing the date directly
                      eventDate = parseISO(event.date);
                    } catch {
                      // If that fails, try creating a date from the input
                      eventDate = new Date(event.date);
                    }

                    // Check if the event date is the same as the current day
                    const isSameDay = format(eventDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                    
                    // Check if the event's hour matches the current hour
                    const eventHour = convertTo24HourFormat(event.startTime);
                    const isCorrectHour = eventHour === hour;

                    // Create a unique key for the event based only on start time
                    const eventKey = `${event.title}-${event.startTime}`;

                    // Only include the event if it's on the same day, same hour, and not a duplicate
                    if (isSameDay && isCorrectHour && !uniqueEventKeys.has(eventKey)) {
                      uniqueEventKeys.add(eventKey);
                      return true;
                    }
                    return false;
                  })
                  .map((event, index) => (
                    <MainEventView
                      key={`${event.id}-${index}`}
                      event={event}
                      currentDate={day}
                      events={events}
                      onEventClick={(event, target, similarEvents) => 
                        handleEventClick(event, target, similarEvents)
                      }
                    />
                  ));

                return filteredEvents;
              })()}
            </Grid>
          ))}
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