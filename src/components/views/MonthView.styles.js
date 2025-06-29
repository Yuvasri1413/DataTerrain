export const styles = {
  container: (theme) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1)
  }),

  weekRow: (theme) => ({
    display: 'flex',
    flex: 1,
    borderBottom: `1px solid ${theme.palette.divider}`
  }),

  dayCell: (theme, { isToday, isSelected, isCurrentMonth }) => ({
    flex: 1,
    minHeight: '120px',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: isToday ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    position: 'relative',
    padding: theme.spacing(0.5),
    cursor: 'pointer',
    opacity: isCurrentMonth ? 1 : 0.5,
    '&:hover': {
      backgroundColor: isSelected 
        ? 'rgba(25, 118, 210, 0.2)'
        : 'rgba(0, 0, 0, 0.04)'
    }
  }),

  dayNumber: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem'
    },
    fontWeight: 'medium',
    marginBottom: 1
  },

  weekDayHeader: (theme) => ({
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1)
  }),

  weekDayCell: {
    flex: 1,
    textAlign: 'center',
    padding: 1,
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem'
    },
    fontWeight: 'medium'
  },

  eventsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    marginTop: 1
  },

  moreEventsButton: (theme) => ({
    fontSize: '0.75rem',
    color: theme.palette.primary.main,
    marginTop: 'auto',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  })
}; 