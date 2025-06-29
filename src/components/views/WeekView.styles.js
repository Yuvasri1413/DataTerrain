export const styles = {
  container: {
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    '& .MuiGrid-container': {
      width: '100%',
      margin: 0,
      maxWidth: '100%'
    },
    '& .MuiGrid-item': {
      padding: 0.5,
      minWidth: 0
    }
  },

  weekHeader: (theme) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(0.5),
    width: '100%',
    '& .MuiGrid-item': {
      flexShrink: 1,
      width: 'auto'
    }
  }),

  timeColumn: {
    minWidth: {
      '@media (width: 1024px)': '40px',
      default: '60px'
    },
    maxWidth: {
      '@media (width: 1024px)': '40px',
      default: '60px'
    }
  },

  dayHeader: {
    flexGrow: 1,
    flexBasis: 0
  },

  dayHeaderText: {
    fontSize: {
      '@media (width: 1024px)': '0.7rem',
      default: '0.875rem'
    }
  },

  hourRow: (theme) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    flexDirection: {
      xs: 'column',
      md: 'row'
    }
  }),

  timeColumnCell: (theme, { isTablet }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isTablet ? 'flex-start' : 'flex-start',
    paddingLeft: isTablet ? 2 : 1,
    borderRight: isTablet ? 'none' : `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    minWidth: isTablet ? 'auto' : '60px',
    position: isTablet ? 'sticky' : 'relative',
    left: isTablet ? 0 : 'auto',
    zIndex: isTablet ? 1 : 'auto'
  }),

  timeText: {
    fontWeight: 'normal',
    fontSize: {
      xs: '0.9rem',
      md: '0.875rem'
    }
  },

  dayColumn: (theme, { isTablet }) => ({
    position: 'relative',
    minHeight: isTablet ? 'auto' : '100%',
    borderLeft: isTablet ? 'none' : `1px solid ${theme.palette.divider}`,
    display: isTablet ? 'flex' : 'block',
    flexDirection: isTablet ? 'column' : 'row',
    alignItems: isTablet ? 'center' : 'stretch',
    justifyContent: isTablet ? 'center' : 'flex-start',
    paddingLeft: isTablet ? 2 : 1,
    paddingRight: isTablet ? 2 : 1,
    paddingTop: isTablet ? 1 : 0,
    paddingBottom: isTablet ? 1 : 0
  })
}; 