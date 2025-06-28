import { Popover } from '@mui/material';

const MultiEventPopover = ({children,anchorEl,open,id,handlePopoverClose}) => {

  return (
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
            p: 2,
            width: {
              xs: '250px',
              sm: '300px',
              md: '350px'
            },
          }
        }}
      >
       {children}
      </Popover>
  )
}

export default MultiEventPopover