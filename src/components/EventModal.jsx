import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Button, 
  Box,
  IconButton,
  useTheme,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Visibility as VisibilityIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import meetLogo from '../assets/meetlogo.png';

// Event Details Component
const EventDetailsSection = ({ event, theme }) => {
  const eventDetails = {
    interviewer: event?.interviewer || 'mohan',
    position: event?.position || 'django developer',
    createdBy: event?.createdBy || '-',
    date: event?.date ? new Date(event.date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : '29 Aug 2024',
    startTime: event?.startTime || '06:00 PM',
    endTime: event?.endTime || '06:40 PM',
    interviewVia: event?.interviewVia || 'Google Meet'
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: theme.spacing(1)
    }}>
      {[
        { label: 'Interview With', value: eventDetails.interviewer },
        { label: 'Position', value: eventDetails.position },
        { label: 'Created By', value: eventDetails.createdBy },
        { label: 'Interview Date', value: eventDetails.date },
        { label: 'Interview Time', value: `${eventDetails.startTime} - ${eventDetails.endTime}` },
        { label: 'Interview Via', value: eventDetails.interviewVia }
      ].map(({ label, value }) => (
        <Typography 
          key={label} 
          variant="body2"
          sx={{
            fontSize: '0.8rem',
            lineHeight: 1.5
          }}
        >
          {label}: {value}
        </Typography>
      ))}
    </Box>
  );
};

// Document Buttons Component
const DocumentButtons = ({ event, theme }) => {
  const documentTypes = [
    { label: 'Resume.docx', viewIcon: <VisibilityIcon />, downloadIcon: <DownloadIcon /> },
    { label: 'Aadharcard', viewIcon: <VisibilityIcon />, downloadIcon: <DownloadIcon /> }
  ];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1),
      mt: theme.spacing(2)
    }}>
      {documentTypes.map(({ label, viewIcon, downloadIcon }) => (
        <Button
          key={label}
          variant="outlined"
          endIcon={
            <>
              {viewIcon}
              {downloadIcon}
            </>
          }
          fullWidth
          sx={{
            textTransform: 'none',
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark,
            justifyContent: 'space-between',
            '& .MuiButton-endIcon': {
              display: 'flex',
              gap: theme.spacing(1)
            }
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

// Meet Logo and Join Button Component
const MeetSection = ({ event, theme }) => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2)
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          height: 64, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src={meetLogo} 
          alt="Google Meet" 
          style={{ 
            width: '100%', 
            maxWidth: 64,
            height: '100%', 
            objectFit: 'contain',
            transition: 'transform 0.3s ease-in-out',
            transform: 'scale(2)',
          }} 
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          width: 'auto',
          minWidth: '120px',
          backgroundColor: '#006DBF',
          '&:hover': {
            backgroundColor: '#005299' // slightly darker shade for hover effect
          }
        }}
      >
        JOIN
      </Button>
    </Box>
  );
};

// Main Event Modal Component
const EventModal = ({ event, onEdit, onDelete, onClose }) => {
  const theme = useTheme();
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    description: '',
    interviewer: '',
    date: new Date(),
    startTime: '',
    endTime: ''
  });

  useEffect(() => {
    // Initialize form with existing event or default values
    if (event) {
      setEditedEvent({
        ...event,
        date: event.date ? new Date(event.date) : new Date(),
        startTime: event.startTime || '05:00 PM',
        endTime: event.endTime || '06:00 PM',
        interviewer: event.interviewer || ''
      });
    }
  }, [event]);

  const handleChange = (field, value) => {
    setEditedEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate and save event
    if (!editedEvent.title) {
      alert('Please enter a title');
      return;
    }

    onEdit({
      ...editedEvent,
      date: editedEvent.date.toISOString().split('T')[0],
      id: event?.id || Date.now()
    });
  };

  return (
    <Box>
      <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          position: 'relative',
          overflow: 'visible',
          padding: '20px',
          width: '500px',
          maxWidth: '90%',
          margin: '0 auto'
        }
      }}
    >
      <IconButton 
        onClick={onClose} 
        sx={{ 
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
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: theme.spacing(2),
          padding: theme.spacing(2.5),
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(2),
          border: '1px solid gray'
        }}
      >
        <Grid container spacing={2} sx={{
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}>
          {/* First Column - Event Details */}
          <Grid item xs={12} md={6} sx={{
            pr: { md: 2 },
            borderRight: { md: `1px solid ${theme.palette.divider}`}
          }}>
            <EventDetailsSection event={event} theme={theme} />
            <DocumentButtons event={event} theme={theme} />
          </Grid>
<></>
          {/* Second Column - Meet Logo and JOIN Button */}
          <Grid item xs={12} md={6} sx={{
            mt: { xs: 2, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <MeetSection event={event} theme={theme} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </Box>
  );
};

export default EventModal; 