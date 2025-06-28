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
  startOfWeek, 
  addDays 
} from 'date-fns';

const WeekView = ({ 
  currentDate, 
  events, 
  onEventClick 
}) => {
  const theme = useTheme();

  // Calculate week start and days
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

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
      {[10, 11, 12, 1, 2, 3, 4, 5, 6].map((hour) => (
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
              {`${hour} ${hour > 12 ? 'PM' : 'AM'}`}
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
                    onClick={(e) => onEventClick(event, e.currentTarget)}
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

export default WeekView; 