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
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Visibility as VisibilityIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import meetLogo from '../../assets/meetlogo.png';
import { styles } from './EventModal.styles';

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
    interviewVia:'Google Meet' 
  };

  return (
    <Box sx={styles.eventDetailsContainer(theme)}>
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
          sx={styles.eventDetailsText}
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
    <Box sx={styles.documentButtonsContainer(theme)}>
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
          sx={styles.documentButton(theme)}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

// Meet Logo and Join Button Component
const MeetSection = ({ event, theme }) => {
  const handleJoinMeeting = () => {
    if (event && event.link) {
      window.open(event.link, '_blank', 'noopener,noreferrer');
    } else {
      alert('No meeting link available');
    }
  };

  return (
    <Box sx={styles.meetSectionContainer(theme)}>
      <Box sx={styles.meetLogoContainer}>
        <img 
          src={meetLogo} 
          alt="Google Meet" 
          style={styles.meetLogo}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleJoinMeeting}
        sx={styles.joinButton}
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
          sx: styles.modalPaper(theme)
        }}
      >
        <IconButton 
          onClick={onClose} 
          sx={styles.closeButton(theme)}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={styles.dialogContent(theme)}>
          <Grid container spacing={2} sx={styles.gridContainer}>
            {/* First Column - Event Details */}
            <Grid item xs={12} md={6} sx={styles.firstGridItem(theme)}>
              <EventDetailsSection event={event} theme={theme} />
              <DocumentButtons event={event} theme={theme} />
            </Grid>

            {/* Second Column - Meet Logo and JOIN Button */}
            <Grid item xs={12} md={6} sx={styles.secondGridItem}>
              <MeetSection event={event} theme={theme} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventModal; 