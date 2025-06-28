import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Badge,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';

const MainEventCard = ({ event }) => {
  return (
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
        xs: '100px',
        sm: '150px',
        md: '200px'
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
        {event?.title || 'Untitled Event'}
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
        Interviewer: {event?.interviewer || 'Not Specified'}
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
        {event?.startTime || 'Start Time'} - {event?.endTime || 'End Time'}
      </Typography>
    </Box>
  )
};
const MainEventView = ({
  event,
  currentDate,
  events,
  onEventClick
}) => {
  const theme = useTheme();
  debugger;
  return (
    <Paper
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
        borderLeft: '10px solid #1976d2',
        // '&:hover': {
        //   transform: 'scale(1.02)',
        //   boxShadow: theme.shadows[4]
        // }
      }}
      onClick={(e) => {
        const similarEvents = events.filter(
          ev => ev.startTime === event.startTime &&
            format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
        );
        onEventClick(event, e.currentTarget, similarEvents);
      }}
    >
      {(() => {
        const similarEventsCount = events.filter(
          ev => ev.startTime === event.startTime &&
            format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
        ).length;

        return similarEventsCount > 1 ? (
          <Badge
            badgeContent={similarEventsCount}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                position: 'absolute',
                top: 0,
                right: 0,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: 0,
                backgroundColor: '#FFDB58',
                color: 'black'
              }
            }}
          >
            <MainEventCard event={event} />
          </Badge>
        ) : (
          <MainEventCard event={event} />
        );
      })()}
    </Paper>
  );
};

export default MainEventView; 