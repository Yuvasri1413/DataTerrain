export const styles = {
  eventCard: {
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
    width: '100%',
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
  },

  eventTitle: {
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
    mb: (isShortDuration) => isShortDuration ? 0 : {
      xs: 0.2,
      sm: 0.25,
      md: 0.3
    }
  },

  interviewer: {
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
    mb: {
      xs: 0.15,
      sm: 0.2,
      md: 0.25
    }
  },

  timeText: {
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
  },

  eventPaper: (theme) => ({
    width: '100%',
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
    '&:hover': {
      boxShadow: theme.shadows[3]
    }
  }),

  badge: {
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
  }
}; 