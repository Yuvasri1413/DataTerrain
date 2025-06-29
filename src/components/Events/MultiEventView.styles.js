export const styles = {
  // Main container styles
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 2,
    border: '1px solid #e0e0e0',
    maxHeight: '400px',
    overflow: 'auto',
    width: {
      xs: '95%',
      sm: '90%',
      md: '100%'
    },
    margin: '0 auto',
    px: 0,
    '&::-webkit-scrollbar': {
      width: '1px',
    },
    '&::-webkit-scrollbar-button:vertical': {
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-track-piece': {
      background: 'transparent',
      height: '100%',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1976d2',
      borderRadius: 0,
      border: 'none',
      backgroundClip: 'border-box',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#1976d2 transparent',
    '-ms-overflow-style': 'none',
  },

  // Header styles
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    py: 1,
    borderBottom: '1px solid #e0e0e0',
  },

  headerTitle: {
    display: 'flex', 
    alignItems: 'center'
  },

  headerText: {
    fontSize: '16px'
  },

  closeButton: {
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },

  // Events List styles
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    p: 0,
    overflowY: 'auto',
    width: '95%',
    margin: '0 auto',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-button:vertical': {
      display: 'none',
      height: 0,
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-track-piece': {
      background: 'transparent',
      height: '100%',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1976d2',
      borderRadius: 0,
      border: 'none',
      backgroundClip: 'border-box',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#1976d2 transparent',
    '-ms-overflow-style': 'none',
  },

  // Event Item styles
  eventItem: {
    p: 1,
    my: 0,
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: 0,
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '10px',
      bottom: '10px',
      left: 0,
      width: '10px',
      backgroundColor: '#1976d2',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }
  },

  eventContent: {
    p: 1, 
    pl: 4
  },

  eventDetails: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 0.5
  },

  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  eventTitle: {
    fontSize: '0.9rem'
  },

  editButton: {
    marginRight: 1
  },

  eventDescription: {
    color: 'black'
  },

  eventDateTime: {
    color: 'textSecondary'
  }
}; 