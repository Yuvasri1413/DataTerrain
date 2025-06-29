import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Badge,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { styles } from './MainEventView.styles';

const MainEventCard = ({ event, events, view, isShortDuration }) => {
  return (
    <Box sx={{
      flex: 1,
      p: {
        xs: 0.5,
        sm: 0.75,
        md: 1
      },
      pl: {
        xs: 1,
        sm: 1,
        md: 1
      },
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      overflow: 'hidden',
      width: 'auto',
      minWidth: {
        xs: '125px',
        sm: '125px',
        md: '125px'
      },
      '@media (width: 1024px)': {
        p: 0.5,
        pl: 0.75,
        minWidth: '110px',
        maxWidth: '120px'
      }
    }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 'bold',
          fontSize: {
            xs: '0.6rem',
            sm: '0.75rem',
            md: '0.85rem'
          },
          '@media (width: 1024px)': {
            fontSize: '0.7rem',
          },
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          mb: 0.2
        }}
      >
        {event?.title || 'Untitled Event'}
      </Typography>

      {isShortDuration ? (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            fontSize: {
              xs: '0.5rem',
              sm: '0.55rem',
              md: '0.65rem'
            },
            '@media (width: 1024px)': {
              fontSize: '0.5rem'
            },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        >
          {event?.startTime || 'Start Time'} - {event?.endTime || 'End Time'}
        </Typography>
      ) : (
        <>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              fontSize: {
                xs: '0.6rem',
                sm: '0.65rem',
                md: '0.75rem'
              },
              '@media (width: 1024px)': {
                fontSize: '0.6rem'
              },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              mb: 0.2
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
                sm: '0.55rem',
                md: '0.65rem'
              },
              '@media (width: 1024px)': {
                fontSize: '0.5rem'
              },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'
            }}
          >
            {event?.startTime || 'Start Time'} - {event?.endTime || 'End Time'}
          </Typography>
        </>
      )}
    </Box>
  );
};

const MainEventView = ({
  event,
  currentDate,
  events,
  onEventClick,
  view = 'day',
  duration
}) => {
  const theme = useTheme();
  const isShortDuration = duration && duration <= 30; // 30 minutes or less

  return (
    <Paper
      elevation={2}
      sx={{
        width: 'fit-content',
        maxWidth: '100%',
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 0.5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: theme.spacing(1),
        position: 'relative',
        transition: 'all 0.3s ease',
        borderLeft: '10px solid #1976d2',
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onClick={(e) => {
        const similarEvents = events.filter(
          view === 'month' 
            ? ev => format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
            : view === 'year'
            ? ev => format(parseISO(ev.date), 'yyyy-MM') === format(currentDate, 'yyyy-MM')
            : ev => ev.startTime === event.startTime && 
                    format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
        );
        onEventClick(event, e.currentTarget, similarEvents);
      }}
    >
      {(() => {
        const similarEventsCount = events.filter(
          view === 'month' 
            ? ev => format(parseISO(ev.date), 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
            : view === 'year'
            ? ev => format(parseISO(ev.date), 'yyyy-MM') === format(currentDate, 'yyyy-MM')
            : ev => ev.startTime === event.startTime && 
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
            <MainEventCard event={event} events={events} view={view} isShortDuration={isShortDuration} />
          </Badge>
        ) : (
          <MainEventCard event={event} events={events} view={view} isShortDuration={isShortDuration} />
        );
      })()}
    </Paper>
  );
};

export default MainEventView; 