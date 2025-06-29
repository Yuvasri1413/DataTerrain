import React, { useState } from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import { DayView, WeekView, MonthView, YearView } from './views';
import MultiEventView from './Events/MultiEventView';
import MultiEventPopover from './Events/MultiEventPopover';
import {
  CalendarView as StyledCalendarView,
  HourRow,
  HourLabel,
  EventsContainer,
  EventBox,
  NoEvents
} from './CalendarView.styles';

const CalendarView = ({ currentDate, viewType, events, onEventSelect, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTimeEvents, setSelectedTimeEvents] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleEventClick = (event, target, eventsAtTime) => {
    if (eventsAtTime.length > 1) {
      setSelectedTimeEvents(eventsAtTime);
      setAnchorEl(target);
    } else {
      onEventSelect(event);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedTimeEvents([]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'event-popover' : undefined;

  const renderView = () => {
    switch (viewType) {
      case 'day':
        return <DayView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />;
      case 'week':
        return <WeekView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />;
      case 'month':
        return <MonthView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />;
      case 'year':
        return <YearView
          currentDate={currentDate}
          events={events}
          onEventClick={handleEventClick}
        />;
    }
  };

  const generateHours = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const hourString = hour === 0 ? '12 AM' :
        hour < 12 ? `${hour} AM` :
          hour === 12 ? '12 PM' :
            `${hour - 12} PM`;
      return hourString;
    });
  };

  const filterEventsForCurrentDate = () => {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    return events.filter(event =>
      event.date === formattedDate
    );
  };

  const renderDayEvents = () => {
    const dayEvents = filterEventsForCurrentDate();

    return generateHours().map((hourLabel, index) => (
      <HourRow key={hourLabel} isMobile={isMobile}>
        <HourLabel isMobile={isMobile}>
          <Typography variant="caption">
            {hourLabel}
          </Typography>
        </HourLabel>

        <EventsContainer>
          {dayEvents
            .filter(event => {
              const eventStartHour = parseInt(event.startTime.split(':')[0]);
              const eventStartPeriod = event.startTime.includes('PM') ? 12 : 0;
              const adjustedStartHour = eventStartHour + eventStartPeriod;
              return adjustedStartHour === index;
            })
            .map((event, eventIndex) => (
              <EventBox
                key={event.id}
                onClick={() => onEventSelect(event)}
                isMobile={isMobile}
                top={`${eventIndex * 30}px`}
              >
                {event.title} - {event.startTime}
              </EventBox>
            ))
          }
        </EventsContainer>
      </HourRow>
    ));
  };

  return (
    <StyledCalendarView sx={sx}>
      {renderView()}

      <MultiEventPopover
        anchorEl={anchorEl}
        open={open}
        id={id}
        handlePopoverClose={handlePopoverClose}
      >
        {selectedTimeEvents.length > 0 && (
          <MultiEventView
            events={selectedTimeEvents}
            onEventSelect={onEventSelect}
            onClose={handlePopoverClose}
            onEdit={(event) => {
              console.log('Edit event', event);
            }}
            onDelete={(event) => {
              console.log('Delete event', event);
            }}
          />
        )}
      </MultiEventPopover>
    </StyledCalendarView>
  );
};

export default CalendarView;