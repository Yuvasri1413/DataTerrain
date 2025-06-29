import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Root styles
export const CalendarView = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'hidden',
  backgroundColor: 'transparent',
  padding: 0,
}));

// Day View styles
export const DayView = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  margin: 0,
  padding: 0,
}));

export const DayHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export const DayEvents = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  margin: 0,
  padding: 0,
  width: '100%',
}));

export const HourRow = styled(Box)(({ theme, isMobile }) => ({
  display: 'flex',
  borderBottom: `1px solid ${theme.palette.divider}`,
  minHeight: isMobile ? '40px' : '60px',
  position: 'relative',
  margin: 0,
  padding: 0,
  width: '100%',
}));

export const HourLabel = styled(Box)(({ theme, isMobile }) => ({
  width: '35px',
  padding: theme.spacing(1, 0),
  textAlign: 'right',
  color: theme.palette.text.secondary,
  fontSize: isMobile ? '0.7rem' : '0.8rem',
  position: 'sticky',
  left: 0,
  backgroundColor: 'white',
  zIndex: 1,
}));

export const EventsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  borderLeft: `1px solid ${theme.palette.divider}`,
  margin: 0,
  padding: 0,
}));

export const EventBox = styled(Box)(({ theme, isMobile, top }) => ({
  position: 'absolute',
  width: '100%',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0.5),
  borderRadius: 0,
  cursor: 'pointer',
  fontSize: isMobile ? '0.7rem' : '0.8rem',
  top: top,
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

// Week View styles
export const WeekView = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: 0,
}));

export const WeekGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
  margin: 0,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const WeekDay = styled(Box)(({ theme, isToday }) => ({
  border: '1px solid #eee',
  padding: theme.spacing(0.5),
  textAlign: 'center',
  backgroundColor: isToday ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
  borderColor: isToday ? theme.palette.primary.main : '#eee',
}));

export const DayLabel = styled(Box)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
}));

// Month View styles
export const MonthView = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: 0,
}));

export const MonthGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(0.5),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const WeekdayHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#666',
  padding: theme.spacing(0.5, 0),
}));

export const MonthDay = styled(Box)(({ theme, isToday, isEmpty }) => ({
  border: '1px solid #eee',
  minHeight: '100px',
  padding: theme.spacing(0.5),
  backgroundColor: isEmpty ? '#fafafa' : 
                  isToday ? 'rgba(52, 152, 219, 0.1)' : 'white',
  borderColor: isToday ? theme.palette.primary.main : '#eee',
  [theme.breakpoints.down('md')]: {
    minHeight: '80px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '60px',
  },
}));

export const DayNumber = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  fontWeight: 'bold',
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

// Year View styles
export const YearView = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const YearGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(1),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const YearMonth = styled(Box)(({ theme }) => ({
  border: '1px solid #eee',
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: 'white',
}));

export const MonthName = styled(Box)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

// Event styles
export const EventItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: 4,
  padding: theme.spacing(0.25, 0.5),
  margin: theme.spacing(0.25, 0),
  fontSize: '0.8rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
    padding: theme.spacing(0.2, 0.4),
  },
}));

export const EventTime = styled(Box)(({ theme }) => ({
  fontSize: '0.7rem',
  opacity: 0.8,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const MoreEvents = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.8rem',
  textAlign: 'center',
  marginTop: theme.spacing(0.5),
  cursor: 'pointer',
}));

export const NoEvents = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  color: '#888',
  padding: theme.spacing(2),
})); 