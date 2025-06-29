export const styles = {
  container: (theme) => ({
    width: '100%',
    position: 'relative',
    padding: theme.spacing(1)
  }),

  timeGridContainer: (theme) => ({
    height: '100px', // HOUR_HEIGHT
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative'
  }),

  timeColumn: (theme) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingTop: 8 // TIME_COLUMN_PADDING
  }),

  timeText: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.7rem',
      md: '0.8rem'
    },
    fontWeight: 'medium'
  },

  verticalSeparator: (theme) => ({
    position: 'absolute',
    left: '16.666%',
    height: '100%',
    borderColor: theme.palette.divider
  }),

  eventsArea: {
    position: 'relative',
    height: '100%'
  },

  eventsOverlay: {
    position: 'absolute',
    top: 0,
    left: '16.666%',
    right: 0,
    height: '2400px', // 24 * HOUR_HEIGHT
    pointerEvents: 'none'
  },

  eventBox: {
    position: 'absolute',
    left: '16px',
    width: '200px', // EVENT_WIDTH
    pointerEvents: 'auto',
    '& > *': {
      height: '100%'
    }
  }
}; 