import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Delete as DeleteIcon 
} from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';

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
      date: format(editedEvent.date, 'yyyy-MM-dd'),
      id: event?.id || Date.now()
    });
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: theme.spacing(2)
        }}
      >
        {event?.id ? 'Edit Event' : 'Create Event'}
        <Box>
          {event?.id && (
            <IconButton 
              onClick={() => onDelete(event.id)}
              color="error"
              size="small"
              sx={{ marginRight: theme.spacing(1) }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <IconButton 
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: theme.spacing(2),
          padding: theme.spacing(2)
        }}
      >
        <TextField 
          fullWidth
          label="Title"
          variant="outlined"
          value={editedEvent.title}
          onChange={(e) => handleChange('title', e.target.value)}
          required
        />

        <TextField 
          fullWidth
          label="Description"
          variant="outlined"
          value={editedEvent.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />

        <TextField 
          fullWidth
          label="Interviewer"
          variant="outlined"
          value={editedEvent.interviewer}
          onChange={(e) => handleChange('interviewer', e.target.value)}
        />

        <DatePicker
          label="Date"
          value={editedEvent.date}
          onChange={(newValue) => handleChange('date', newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />

        <Box 
          sx={{ 
            display: 'flex', 
            gap: theme.spacing(2) 
          }}
        >
          <TimePicker
            label="Start Time"
            value={new Date(`1970-01-01T${editedEvent.startTime}`)}
            onChange={(newValue) => 
              handleChange('startTime', format(newValue, 'hh:mm a'))
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          <TimePicker
            label="End Time"
            value={new Date(`1970-01-01T${editedEvent.endTime}`)}
            onChange={(newValue) => 
              handleChange('endTime', format(newValue, 'hh:mm a'))
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: theme.spacing(2) }}>
        <Button 
          onClick={onClose} 
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal; 