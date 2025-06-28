import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { format, parseISO, startOfWeek, addDays } from 'date-fns';
import './CalendarView.css';

const CalendarView = ({ 
  currentDate, 
  viewType, 
  events, 
  onEventSelect 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateDayHours = () => {
    const hours = [];
    for (let hour = 0; hour <= 23; hour++) {
      hours.push(hour);
    }
    return hours;
  };

  const renderDayView = () => {
    const hours = generateDayHours();
    const dayEvents = events.filter(event => 
      format(parseISO(event.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );

    return (
      <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: theme.spacing(2)
        }}>
          <Typography variant="h6">
            {format(currentDate, 'dd MMMM yyyy')}
          </Typography>
        </Box>

        {hours.map((hour) => {
          const amPm = hour < 12 ? 'AM' : 'PM';
          const displayHour = hour % 12 || 12;

          return (
            <Grid 
              container 
              key={hour} 
              sx={{ 
                borderBottom: `1px solid ${theme.palette.divider}`,
                minHeight: '50px',
                alignItems: 'center'
              }}
            >
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
                  {`${displayHour} ${amPm}`}
                </Typography>
              </Grid>

              <Grid 
                item 
                xs 
                sx={{ 
                  position: 'relative',
                  minHeight: '50px'
                }}
              >
                {dayEvents
                  .filter(event => {
                    const eventHour = parseInt(event.startTime.split(':')[0]);
                    const eventAmPm = event.startTime.split(' ')[1];
                    return (
                      (eventAmPm === 'AM' ? eventHour : eventHour + 12) === hour
                    );
                  })
                  .map((event, index) => (
                    <Paper
                      key={event.id}
                      elevation={2}
                      sx={{
                        width: '100%',
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        padding: theme.spacing(1),
                        marginBottom: theme.spacing(1),
                        borderRadius: theme.spacing(1),
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {event.title}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {event.description}
                        </Typography>
                        <Typography variant="caption">
                          Interviewer: {event.interviewer}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Date: {format(parseISO(event.date), 'dd MMM yyyy')}
                        </Typography>
                        <Typography variant="caption">
                          Time: {event.startTime} - {event.endTime}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton 
                          size="small" 
                          color="inherit"
                          onClick={() => onEventSelect(event)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => onEventSelect(event)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
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

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
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

        {[10, 11, 12, 1, 2, 3, 4, 5, 6].map((hour) => (
          <Grid 
            container 
            key={hour} 
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              minHeight: '100px'
            }}
          >
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
                {`${hour} ${hour > 12 ? 'PM' : 'AM'}`}
              </Typography>
            </Grid>

            {weekDays.map((day) => (
              <Grid 
                item 
                xs 
                key={day.toISOString()}
                sx={{ 
                  position: 'relative',
                  minHeight: '100px',
                  borderLeft: `1px solid ${theme.palette.divider}`
                }}
              >
                {events
                  .filter(event => 
                    format(parseISO(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') &&
                    parseInt(event.startTime.split(':')[0]) === hour
                  )
                  .map((event, index) => (
                    <Paper
                      key={event.id}
                      elevation={2}
                      sx={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        padding: theme.spacing(0.5),
                        marginTop: `${index * 30}px`,
                        borderRadius: theme.spacing(1),
                        cursor: 'pointer'
                      }}
                      onClick={() => onEventSelect(event)}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        {event.title}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {event.startTime} - {event.endTime}
                      </Typography>
                    </Paper>
                  ))}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    );
  };

  const renderMonthView = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const monthDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      monthDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      monthDays.push(currentDay);
    }

    return (
      <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
        <Grid 
          container 
          spacing={1}
          sx={{ 
            borderBottom: `1px solid ${theme.palette.divider}`,
            marginBottom: theme.spacing(2)
          }}
        >
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Grid item xs key={day}>
              <Typography variant="subtitle2" align="center">
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1}>
          {monthDays.map((day, index) => {
            if (!day) return (
              <Grid item xs key={`empty-${index}`}>
                <Box sx={{ height: '100px' }}></Box>
              </Grid>
            );

            const dayEvents = events.filter(event => 
              format(parseISO(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <Grid 
                item 
                xs 
                key={day.toISOString()}
                sx={{ 
                  border: `1px solid ${theme.palette.divider}`,
                  minHeight: '100px',
                  position: 'relative'
                }}
              >
                <Typography 
                  variant="caption" 
                  sx={{ 
                    position: 'absolute', 
                    top: theme.spacing(1), 
                    right: theme.spacing(1) 
                  }}
                >
                  {day.getDate()}
                </Typography>

                {dayEvents.slice(0, 2).map((event, eventIndex) => (
                  <Paper
                    key={event.id}
                    elevation={2}
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      padding: theme.spacing(0.5),
                      margin: theme.spacing(0.5),
                      borderRadius: theme.spacing(1),
                      cursor: 'pointer',
                      position: 'relative',
                      top: theme.spacing(3)
                    }}
                    onClick={() => onEventSelect(event)}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {event.title}
                    </Typography>
                  </Paper>
                ))}

                {dayEvents.length > 2 && (
                  <Typography 
                    variant="caption" 
                    color="primary"
                    sx={{ 
                      position: 'absolute', 
                      bottom: theme.spacing(1), 
                      right: theme.spacing(1) 
                    }}
                  >
                    +{dayEvents.length - 2} more
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  const renderView = () => {
    switch(viewType) {
      case 'day': return renderDayView();
      case 'week': return renderWeekView();
      case 'month': return renderMonthView();
      default: return renderDayView();
    }
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      {renderView()}
    </Box>
  );
};

export default CalendarView; 