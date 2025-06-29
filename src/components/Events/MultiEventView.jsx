import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  useTheme
} from '@mui/material';
import { format, parseISO } from 'date-fns';
import { 
  EditOutlined as EditOutlinedIcon, 
  DeleteOutlined as DeleteOutlinedIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';
import { styles } from './MultiEventView.styles';

const MultiEventView = ({ 
  events, 
  onEventSelect, 
  onClose,
  onEdit,
  onDelete
}) => {
  const theme = useTheme();

  return (
    <Box sx={styles.container}>
      {/* Header */}
      <Box sx={styles.header}>
        <Box sx={styles.headerTitle}>
          <Typography sx={styles.headerText}>
            Meetings
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={styles.closeButton}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Events List */}
      <Box sx={styles.eventsList}>
        {events.map((event) => (
          <Box
            key={event.id}
            sx={styles.eventItem}
            onClick={() => {
              onEventSelect(event);
              onClose();
            }}
          >
            <Box sx={styles.eventContent}>
              <Box sx={styles.eventDetails}>
                <Box sx={styles.eventHeader}>
                  <Typography variant="subtitle1" sx={styles.eventTitle}>
                    {event.title}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="inherit"
                      sx={styles.editButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(event);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(event);
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" sx={styles.eventDescription}>
                  {event.description} | Interviewer: {event.interviewer}
                </Typography>
                <Typography variant="caption" sx={styles.eventDateTime}>
                  Date: {format(parseISO(event.date), 'dd MMM yyyy')} | Time: {event.startTime} - {event.endTime}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MultiEventView; 