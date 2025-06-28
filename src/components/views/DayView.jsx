import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';

const DayView = ({ 
  currentDate, 
  events, 
  onEventClick 
}) => {
  const theme = useTheme();

  // Generate hours for the day view
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Filter events for the current day
  const dayEvents = events.filter(event =>
    format(parseISO(event.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
  );

  // Group events by hour and remove duplicates
  const eventsByTime = dayEvents.reduce((acc, event) => {
    const eventHour = parseInt(event.startTime.split(':')[0]);
    const eventAmPm = event.startTime.split(' ')[1];
    const hourKey = (eventAmPm === 'AM' ? eventHour : eventHour + 12);

    // Create a unique key to identify duplicate events
    const eventKey = `${event.title}-${event.startTime}-${event.endTime}`;

    if (!acc[hourKey]) {
      acc[hourKey] = [];
    }

    // Only add if this exact event is not already in the hour
    if (!acc[hourKey].some(e =>
      `${e.title}-${e.startTime}-${e.endTime}` === eventKey
    )) {
      acc[hourKey].push(event);
    }

    return acc;
  }, {});

  return (
    <Box sx={{
      width: '100%',
      padding: theme.spacing(1)
    }}>
      {hours.map((hour) => {
        const amPm = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 || 12;
        const eventsAtHour = eventsByTime[hour] || [];

        return (
          <Grid
            container
            key={hour}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              minHeight: {
                xs: '100px',
                sm: '100px',
                md: '100px'
              },
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Time Column */}
            <Grid
              item
              xs={2}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                position: 'relative'
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
                {`${displayHour} ${amPm}`}
              </Typography>
            </Grid>

            {/* Vertical Separator Line */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                position: 'absolute',
                left: '16.666%', // Aligned with the end of time column
                height: '100%',
                borderColor: theme.palette.divider,
                borderWidth: '1px',
                zIndex: 1
              }}
            />

            {/* Events Column */}
            <Grid
              item
              xs
              sx={{
                position: 'relative',
                minHeight: {
                  xs: '40px',
                  sm: '45px',
                  md: '50px'
                },
                width: '100%',
                pl: '10px'
              }}
            >
              {eventsAtHour.map((event) => (
                <Paper
                  key={event.id}
                  elevation={2}
                  sx={{
                    width: 'fit-content',
                    maxWidth: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: theme.spacing(1),
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      width: '6px',
                      backgroundColor: '#1976d2'
                    },
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[4]
                    }
                  }}
                  onClick={(e) => {
                    const similarEvents = events.filter(
                      ev => ev.startTime === event.startTime &&
                        format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
                    );
                    onEventClick(event, e.currentTarget, similarEvents);
                  }}
                >
                  <Box sx={{
                    flex: 1,
                    p: {
                      xs: 0.5,
                      sm: 0.75,
                      md: 1
                    },
                    pl: {
                      xs: 2,
                      sm: 3,
                      md: 4
                    },
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    width: 'auto',
                    minWidth: {
                      xs: '150px',
                      sm: '200px',
                      md: '250px'
                    }
                  }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: {
                          xs: '0.7rem',
                          sm: '0.8rem',
                          md: '0.9rem'
                        },
                        wordBreak: 'break-word',
                        mb: {
                          xs: 0.25,
                          sm: 0.35,
                          md: 0.5
                        }
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontSize: {
                          xs: '0.6rem',
                          sm: '0.7rem',
                          md: '0.8rem'
                        },
                        wordBreak: 'break-word',
                        mb: {
                          xs: 0.15,
                          sm: 0.25,
                          md: 0.35
                        }
                      }}
                    >
                      Interviewer: {event.interviewer}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontSize: {
                          xs: '0.5rem',
                          sm: '0.6rem',
                          md: '0.7rem'
                        },
                        wordBreak: 'break-word'
                      }}
                    >
                      {event.startTime} - {event.endTime}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default DayView; 