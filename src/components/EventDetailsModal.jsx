import React from 'react';
import { 
  Box, 
  Typography, 
  Modal, 
  IconButton, 
  Button, 
  useTheme 
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Visibility as VisibilityIcon, 
  Download as DownloadIcon 
} from '@mui/icons-material';
import { format } from 'date-fns';

const EventDetailsModal = ({ 
  open, 
  onClose, 
  event 
}) => {
  const theme = useTheme();

  if (!event) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiBox-root': {
          outline: 'none'
        }
      }}
    >
      <Box
        sx={{
          width: {
            xs: '90%',
            sm: '500px',
            md: '600px'
          },
          maxHeight: '90vh',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          position: 'relative',
          overflow: 'auto'
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'text.secondary'
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Event Details */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box 
            sx={{ 
              width: 64, 
              height: 64, 
              mr: 3,
              background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FBBC05 100%)',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="/src/assets/google-meet-icon.svg" 
              alt="Google Meet" 
              style={{ width: '80%', height: '80%' }} 
            />
          </Box>
          
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Interview With: {event.interviewer}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Position: {event.title}
            </Typography>
          </Box>
        </Box>

        {/* Event Details Grid */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 2,
          mb: 3
        }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Created By:
            </Typography>
            <Typography variant="body1">
              {event.createdBy || 'System'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Interview Date:
            </Typography>
            <Typography variant="body1">
              {format(new Date(event.date), 'dd MMM yyyy')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Interview Time:
            </Typography>
            <Typography variant="body1">
              {event.startTime} - {event.endTime}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Interview Via:
            </Typography>
            <Typography variant="body1">
              {event.interviewVia || 'Google Meet'}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            fullWidth
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main
            }}
            onClick={() => {
              // Add logic to view resume
              window.open(event.resumeUrl, '_blank');
            }}
          >
            Resume.docx
          </Button>
          <Button
            variant="outlined"
            startIcon={<VisibilityIcon />}
            fullWidth
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main
            }}
            onClick={() => {
              // Add logic to view Aadhar card
              window.open(event.aadharUrl, '_blank');
            }}
          >
            Aadharcard
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              // Add logic to join Google Meet
              window.open(event.meetLink, '_blank');
            }}
          >
            JOIN
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventDetailsModal; 