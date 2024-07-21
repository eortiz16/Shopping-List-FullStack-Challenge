import React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import './ModalAppBar.scss';

/**
 * ModalAppBar component renders a top application bar with a title and an icon button.
 *
 * @return {React.ReactElement} - A React element representing the application bar with the title "SHOPPING LIST" and an icon button.
 */
const ModalAppBar: React.FC = () => {
  const TITLE = 'SHOPPING LIST';

  return (
    <AppBar position="static" sx={{ boxShadow: 'none' }}>
      <Toolbar className="modal-app-bar">
        <Typography variant="h6" className="modal-app-bar-text">
          {TITLE}
        </Typography>
        <Box className="modal-app-bar-icon">
          <div className="material-icons-outlined">skip_next</div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ModalAppBar;
