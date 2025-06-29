import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import {
  format,
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { styles, StyledTabs, StyledTab } from './CalendarHeader.styles';

// Function to add ordinal suffix to a number
const addOrdinalSuffix = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) return number + "st";
  if (j === 2 && k !== 12) return number + "nd";
  if (j === 3 && k !== 13) return number + "rd";
  return number + "th";
};

const CalendarHeader = ({
  currentDate,
  viewType,
  onViewChange,
  onDateChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Render date title based on view type
  const renderDateTitle = () => {
    switch (viewType) {
      case 'day': {
        const day = addOrdinalSuffix(currentDate.getDate());
        const month = format(currentDate, 'MMMM');
        const year = format(currentDate, 'yyyy');
        return `${day} ${month} ${year}`;
      }
      case 'week': {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        const startDay = addOrdinalSuffix(weekStart.getDate());
        const endDay = addOrdinalSuffix(weekEnd.getDate());
        const startMonth = format(weekStart, 'MMMM');
        const endMonth = format(weekEnd, 'MMMM');
        const year = format(weekEnd, 'yyyy');
        return `${startDay} ${startMonth} to ${endDay} ${endMonth} ${year}`;
      }
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'year':
        return format(currentDate, 'yyyy');
      default: {
        const day = addOrdinalSuffix(currentDate.getDate());
        const month = format(currentDate, 'MMMM');
        const year = format(currentDate, 'yyyy');
        return `${day} ${month} ${year}`;
      }
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    onViewChange(newValue);
  };

  return (
    <>
      {/* First Row: Create Schedule Button */}
      <Box sx={styles.createButtonContainer}>
        <Button
          color="primary"
          sx={styles.createButton(theme, isMobile)}
        >
          + Create Schedule
        </Button>
      </Box>

      {/* Second Row: Navigation and Tabs */}
      <Box sx={styles.navigationContainer(theme, isMobile)}>
        {/* Date Navigation with Separate Buttons */}
        <Box sx={styles.dateNavigation(isMobile)}>
          <IconButton
            onClick={() => onDateChange('prev')}
            sx={styles.navigationButton(theme, isMobile)}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => onDateChange('next')}
            sx={styles.navigationButton(theme, isMobile, true)}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={styles.dateTitle(isMobile)}
        >
          {renderDateTitle()}
        </Typography>
        {/* View Type Tabs */}
        <StyledTabs
          value={viewType}
          onChange={handleTabChange}
          aria-label="calendar view tabs"
          sx={styles.tabsContainer(theme, isMobile)}
        >
          <StyledTab value="day" label="Day" />
          <StyledTab value="week" label="Week" />
          <StyledTab value="month" label="Month" />
          <StyledTab value="year" label="Year" />
        </StyledTabs>
      </Box>
    </>
  );
};

export default CalendarHeader; 