import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider,
  useTheme,
} from '@mui/material';
import { format, parseISO, parse, differenceInMinutes, max } from 'date-fns';
import MainEventView from '../Events/MainEventView';

const DayView = ({ 
  currentDate, 
  events, 
  onEventClick 
}) => {
  const theme = useTheme();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const HOUR_HEIGHT = 100; // Height of each hour row in pixels
  const EVENT_WIDTH = 200; // Fixed width for event cards
  const TIME_COLUMN_PADDING = 8; // Padding from the time column

  // Group events by start time and calculate max duration
  const groupedEvents = events
    .filter(event => format(parseISO(event.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd'))
    .reduce((acc, event) => {
      const startDateTime = parse(event.startTime, 'h:mm a', new Date());
      const startTimeKey = format(startDateTime, 'HH:mm');
      
      if (!acc[startTimeKey]) {
        acc[startTimeKey] = {
          events: [],
          startHour: startDateTime.getHours(),
          startMinutes: startDateTime.getMinutes(),
          maxEndDateTime: parse(event.endTime, 'h:mm a', new Date())
        };
      }
      
      const endDateTime = parse(event.endTime, 'h:mm a', new Date());
      acc[startTimeKey].events.push(event);
      acc[startTimeKey].maxEndDateTime = max([acc[startTimeKey].maxEndDateTime, endDateTime]);
      
      return acc;
    }, {});

  // Convert grouped events to positioned events
  const processedEvents = Object.values(groupedEvents).map(group => {
    const durationMinutes = differenceInMinutes(group.maxEndDateTime, 
      new Date().setHours(group.startHour, group.startMinutes));

    return {
      ...group.events[0],
      allEvents: group.events,
      // Add TIME_COLUMN_PADDING to align with the time labels
      top: (group.startHour * HOUR_HEIGHT) + ((group.startMinutes / 60) * HOUR_HEIGHT) + TIME_COLUMN_PADDING,
      height: Math.max((durationMinutes / 60) * HOUR_HEIGHT, 40), // Minimum height of 40px
      durationMinutes: durationMinutes
    };
  });

  return (
    <Box sx={{ width: '100%', position: 'relative', padding: theme.spacing(1) }}>
      {/* Time grid */}
      {hours.map((hour) => (
        <Grid
          container
          key={hour}
          sx={{
            height: `${HOUR_HEIGHT}px`,
            borderBottom: `1px solid ${theme.palette.divider}`,
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
              position: 'relative',
              paddingTop: TIME_COLUMN_PADDING
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: '0.6rem',
                  sm: '0.7rem',
                  md: '0.8rem'
                },
                fontWeight: 'medium'
              }}
            >
              {hour === 0 ? '12 AM' : 
               hour === 12 ? '12 PM' : 
               hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
            </Typography>
          </Grid>

          {/* Vertical Separator */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              position: 'absolute',
              left: '16.666%',
              height: '100%',
              borderColor: theme.palette.divider
            }}
          />

          {/* Events area */}
          <Grid
            item
            xs={10}
            sx={{
              position: 'relative',
              height: '100%'
            }}
          />
        </Grid>
      ))}

      {/* Overlay events */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '16.666%',
          right: 0,
          height: `${24 * HOUR_HEIGHT}px`,
          pointerEvents: 'none'
        }}
      >
        {processedEvents.map((event) => (
          <Box
            key={event.id}
            sx={{
              position: 'absolute',
              top: event.top,
              height: event.height,
              left: '16px',
              width: EVENT_WIDTH,
              pointerEvents: 'auto',
              '& > *': {
                height: '100%'
              }
            }}
          >
            <MainEventView
              event={event}
              currentDate={currentDate}
              events={event.allEvents}
              onEventClick={onEventClick}
              view="day"
              duration={event.durationMinutes}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DayView; 