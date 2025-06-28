import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  useTheme 
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon 
} from '@mui/icons-material';
import { format } from 'date-fns';

const CalendarHeader = ({ 
  currentDate, 
  viewType, 
  onDateChange, 
  onViewChange 
}) => {
  const theme = useTheme();

  const renderDateTitle = () => {
    switch(viewType) {
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      case 'week':
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return `${format(weekStart, 'MMMM d')} to ${format(weekEnd, 'MMMM d, yyyy')}`;
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'year':
        return format(currentDate, 'yyyy');
      default:
        return format(currentDate, 'MMMM d, yyyy');
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: theme.spacing(2)
      }}
    >
      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton 
          onClick={() => onDateChange('prev')}
          size="small"
          sx={{ marginRight: theme.spacing(1) }}
        >
          <ChevronLeftIcon />
        </IconButton>
        
        <Typography variant="h6" component="span">
          {renderDateTitle()}
        </Typography>
        
        <IconButton 
          onClick={() => onDateChange('next')}
          size="small"
          sx={{ marginLeft: theme.spacing(1) }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* View Type Buttons */}
      <Box>
        <Button 
          variant={viewType === 'day' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => onViewChange('day')}
          sx={{ 
            marginRight: theme.spacing(1),
            minWidth: '60px'
          }}
        >
          Day
        </Button>
        <Button 
          variant={viewType === 'week' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => onViewChange('week')}
          sx={{ 
            marginRight: theme.spacing(1),
            minWidth: '60px'
          }}
        >
          Week
        </Button>
        <Button 
          variant={viewType === 'month' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => onViewChange('month')}
          sx={{ 
            marginRight: theme.spacing(1),
            minWidth: '60px'
          }}
        >
          Month
        </Button>
        <Button 
          variant={viewType === 'year' ? 'contained' : 'outlined'}
          color="primary"
          size="small"
          onClick={() => onViewChange('year')}
          sx={{ minWidth: '60px' }}
        >
          Year
        </Button>
      </Box>
    </Box>
  );
};

export default CalendarHeader; 