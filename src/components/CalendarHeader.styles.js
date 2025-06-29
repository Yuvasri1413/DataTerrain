import { styled } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

export const StyledTabs = styled(Tabs)(({ theme }) => ({
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

export const StyledTab = styled(Tab)(({ theme }) => ({
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

export const styles = {
  createButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: (theme) => theme.spacing(1, 0)
  },

  createButton: (theme, isMobile) => ({
    textTransform: 'none',
    borderRadius: 2,
    padding: isMobile ? theme.spacing(0.5, 1) : theme.spacing(1, 2),
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontSize: isMobile ? '0.75rem' : 'inherit'
  }),

  navigationContainer: (theme, isMobile) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'stretch' : 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    mb: theme.spacing(2),
    width: '100%'
  }),

  dateNavigation: (isMobile) => ({
    display: 'flex',
    alignItems: 'center',
    width: isMobile ? '100%' : 'auto',
    justifyContent: isMobile ? 'space-between' : 'flex-start'
  }),

  navigationButton: (theme, isMobile, isNext = false) => ({
    color: theme.palette.text.primary,
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    mr: isNext ? 0 : (isMobile ? 0 : 1),
    ml: isNext ? (isMobile ? 0 : 1) : 0,
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
      boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
    }
  }),

  dateTitle: (isMobile) => ({
    mx: 2,
    textAlign: 'center',
    fontSize: isMobile ? '0.875rem' : '1.5rem',
    fontWeight: 'bold'
  }),

  tabsContainer: (theme, isMobile) => ({
    width: isMobile ? '100%' : 'auto',
    marginTop: isMobile ? theme.spacing(1) : 0
  })
}; 