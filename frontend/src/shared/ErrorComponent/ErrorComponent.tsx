import React from 'react';
import { Box, Typography } from '@mui/material';
import './ErrorComponent.scss';

const ErrorComponent: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <Box className="error-container">
      <span className="material-icons-outlined error-icon">error</span>
      <Typography variant="h6" color="error" className="error-message">
        {errorMessage}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
