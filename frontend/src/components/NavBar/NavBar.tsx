import React from 'react';
import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import './NavBar.scss';

/**
 * NavBar component renders the top navigation bar for the application.
 * It includes the application title and uses custom styling.
 *
 * @returns {JSX.Element} The rendered top bar component.
 */
const NavBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="navbar-title"
          >
            SHOPPING LIST
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default React.memo(NavBar);
