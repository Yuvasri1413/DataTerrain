// Common Styles
export const styles = {
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  // Event Details Section Styles
  eventDetailsContainer: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1)
  }),
  eventDetailsText: {
    fontSize: '0.8rem',
    lineHeight: 1.5
  },

  // Document Buttons Styles
  documentButtonsContainer: (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    mt: theme.spacing(2)
  }),
  documentButton: (theme) => ({
    textTransform: 'none',
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    justifyContent: 'space-between',
    '& .MuiButton-endIcon': {
      display: 'flex',
      gap: theme.spacing(1)
    }
  }),

  // Meet Section Styles
  meetSectionContainer: (theme) => ({ 
    width: '100%', 
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(2)
  }),
  meetLogoContainer: {
    width: '100%', 
    height: '80px', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meetLogo: {
    width: 'auto', 
    height: '100%', 
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
    transform: 'scale(2)',
  },
  joinButton: {
    textTransform: 'none',
    width: 'auto',
    minWidth: '140px',
    padding: '8px 24px',
    backgroundColor: '#006DBF',
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#005299',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
  },

  // Modal Styles
  modalPaper: (theme) => ({
    borderRadius: 2,
    position: 'relative',
    overflow: 'visible',
    padding: '20px',
    width: '500px',
    maxWidth: '90%',
    margin: '0 auto'
  }),
  closeButton: (theme) => ({
    position: 'absolute',
    top: -10,
    right: -10,
    color: 'white',
    backgroundColor: '#006DBF',
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: '50%',
    '& svg': {
      width: theme.spacing(2),
      height: theme.spacing(2)
    },
    '&:hover': {
      backgroundColor: '#005299'
    },
    zIndex: 10
  }),
  dialogContent: (theme) => ({ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: theme.spacing(2),
    padding: theme.spacing(2.5),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    border: '1px solid gray'
  }),
  gridContainer: {
    flexWrap: { xs: 'wrap', md: 'nowrap' }
  },
  firstGridItem: (theme) => ({
    pr: { md: 2 },
    borderRight: { md: `1px solid ${theme.palette.divider}`}
  }),
  secondGridItem: {
    mt: { xs: 2, md: 0 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: { xs: '200px', md: '300px' }
  }
}; 