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

const MultiEventView = ({ 
  events, 
  onEventSelect, 
  onClose,
  onEdit,
  onDelete
}) => {
  const theme = useTheme();

  return (
    <Box sx={{
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
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderBottom: '1px solid #e0e0e0',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '16px' }}>
            Meetings
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.1)'
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Events List */}
      <Box sx={{
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
      }}>
        {events.map((event) => (
          <Box
            key={event.id}
            sx={{
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
            }}
            onClick={() => {
              onEventSelect(event);
              onClose();
            }}
          >
            <Box sx={{ p: 1, pl: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <Typography variant="subtitle1" sx={{ fontSize: '0.9rem' }}>
                    {event.title}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      color="inherit"
                      sx={{ marginRight: 1 }}
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
                <Typography variant="body2" color="black">
                  {event.description} | Interviewer: {event.interviewer}
                </Typography>
                <Typography variant="caption" color="textSecondary">
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