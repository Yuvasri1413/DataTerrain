import React from 'react';
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
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';

const MonthView = ({ 
  currentDate, 
  events, 
  onEventClick 
}) => {
  const theme = useTheme();

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

  return (
    <Box sx={{ width: '100%', padding: theme.spacing(2) }}>
      {/* Week Days Header */}
      <Grid
        container
        spacing={1}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacing(2)
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <Grid item xs key={day}>
            <Typography variant="subtitle2" align="center">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Month Grid */}
      <Grid container spacing={1}>
        {monthDays.map((day, index) => {
          // Check if day is in current month
          const isCurrentMonth = 
            day.getMonth() === currentDate.getMonth() && 
            day.getFullYear() === currentDate.getFullYear();

          // Filter events for this day
          const dayEvents = events.filter(event =>
            format(parseISO(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <Grid
              item
              xs
              key={index}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                minHeight: '100px',
                position: 'relative',
                backgroundColor: !isCurrentMonth ? theme.palette.grey[100] : 'inherit'
              }}
            >
              {/* Day Number */}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: theme.spacing(1),
                  right: theme.spacing(1),
                  color: !isCurrentMonth ? theme.palette.text.disabled : 'inherit'
                }}
              >
                {day.getDate()}
              </Typography>

              {/* Events */}
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
                  onClick={(e) => onEventClick(event, e.currentTarget)}
                >
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {event.title}
                  </Typography>
                </Paper>
              ))}

              {/* More Events Indicator */}
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

export default MonthView; 