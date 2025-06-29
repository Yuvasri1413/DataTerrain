export const styles = {
  container: (theme) => ({
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(2, 1fr)',
      sm: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)'
    },
    gap: theme.spacing(2),
    padding: theme.spacing(2)
  }),

  monthCard: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden'
  }),

  monthHeader: (theme) => ({
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    fontSize: {
      xs: '0.875rem',
      sm: '1rem',
      md: '1.25rem'
    },
    fontWeight: 'medium'
  }),

  weekDaysHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  },

  weekDayCell: {
    padding: 0.5,
    textAlign: 'center',
    fontSize: {
      xs: '0.65rem',
      sm: '0.75rem',
      md: '0.875rem'
    }
  },

  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    flex: 1
  },

  dayCell: (theme, { isToday, isCurrentMonth }) => ({
    padding: 0.25,
    textAlign: 'center',
    fontSize: {
      xs: '0.65rem',
      sm: '0.75rem',
      md: '0.875rem'
    },
    backgroundColor: isToday ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    opacity: isCurrentMonth ? 1 : 0.5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  }),

  eventIndicator: (theme) => ({
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    margin: '2px auto 0'
  })
}; 