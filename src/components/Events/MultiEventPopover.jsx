import { Popover } from '@mui/material';
import { styles } from './MultiEventPopover.styles';

const MultiEventPopover = ({
  children,
  anchorEl,
  open,
  id,
  handlePopoverClose
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={styles.anchorOrigin}
      transformOrigin={styles.transformOrigin}
      sx={styles.popover}
    >
      {children}
    </Popover>
  );
};

export default MultiEventPopover;