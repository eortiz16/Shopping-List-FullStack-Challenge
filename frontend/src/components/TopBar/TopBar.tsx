import * as React from 'react';
import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import './TopBar.scss';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="custom-app-bar">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="dosis-font"
          >
            SHOPPING LIST
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
