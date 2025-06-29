import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Tabs,
  Tab,
  styled,
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

// Function to add ordinal suffix to a number
const addOrdinalSuffix = (number) => {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) return number + "st";
  if (j === 2 && k !== 12) return number + "nd";
  if (j === 3 && k !== 13) return number + "rd";
  return number + "th";
};

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  width: '100%',
  '& .MuiTabs-indicator': {
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    bottom: 0
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between'
    }
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 60,
  fontWeight: 500,
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    padding: theme.spacing(1, 1),
    fontSize: '0.75rem'
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: 600
  }
}));

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: theme.spacing(1, 0)
        }}
      >
        <Button
          color="primary"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            padding: theme.spacing(1, 2),
            backgroundColor: 'white',
            color: theme.palette.primary.main,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            ...(isMobile && {
              padding: theme.spacing(0.5, 1),
              fontSize: '0.75rem'
            })
          }}
        >
          + Create Schedule
        </Button>
      </Box>

      {/* Second Row: Navigation and Tabs */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          justifyContent: 'space-between',
          gap: theme.spacing(2),
          mb: theme.spacing(2),
          width: '100%'
        }}
      >
        {/* Date Navigation with Separate Buttons */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'space-between' : 'flex-start'
        }}>
          <IconButton
            onClick={() => onDateChange('prev')}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              mr: isMobile ? 0 : 1,
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => onDateChange('next')}
            sx={{
              color: theme.palette.text.primary,
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              ml: isMobile ? 0 : 1,
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
                boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
              }
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body1"
          sx={{
            mx: 2,
            textAlign: 'center',
            fontSize: '1.5 rem',
            fontWeight: 'bold',
            ...(isMobile && {
              fontSize: '0.875rem'
            })
          }}
        >
          {renderDateTitle()}
        </Typography>
        {/* View Type Tabs */}
        <StyledTabs
          value={viewType}
          onChange={handleTabChange}
          aria-label="calendar view tabs"
          sx={{
            width: isMobile ? '100%' : 'auto',
            marginTop: isMobile ? theme.spacing(1) : 0
          }}
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