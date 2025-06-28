import React, { useState } from 'react';
import { Box, Popover, Stack } from '@mui/material';

const CirclePopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'circle-popover' : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {/* Circle Button */}
      <Box
        onClick={handleClick}
        sx={{
          width: 13,
          height: 60,
        //   borderRadius: '50%',
          backgroundColor: '#1976d2',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Open
      </Box>

      {/* Popover with Stack */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: '#f50057',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            Box 1
          </Box>
          <Box
            sx={{
              width: 100,
              height: 100,
              backgroundColor: '#4caf50',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            Box 2
          </Box>
        </Stack>
      </Popover>
    </Box>
  );
};

export default CirclePopover;
