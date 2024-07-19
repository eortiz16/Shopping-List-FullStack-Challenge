// Loading.tsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './LoadingComponent.scss';

/**
 * Loading component displays a spinner to indicate an asynchronous task or backend call is in progress.
 * It uses Material-UI's CircularProgress component for the spinner and Box component for layout.
 *
 * @return {React.ReactElement} - A React element representing the loading spinner.
 */
const Loading: React.FC = () => {
    return (
        <Box className="loading-container" data-testid="loading-container">
            <CircularProgress className="circular-progress" />
        </Box>
    );
}

export default Loading;
