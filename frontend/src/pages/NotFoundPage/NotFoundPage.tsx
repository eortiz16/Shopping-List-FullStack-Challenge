import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

/**
 * NotFoundPage component displays a 404 error message indicating that the requested page was not found.
 * It provides a button to navigate back to the home page.
 *
 * @returns {JSX.Element} The rendered not found page component.
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className={'page-container'}>
      <Typography variant="h1" className={'error-code'}>
        404
      </Typography>
      <Typography variant="h4" className={'error-message'}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={'back-button'}
        onClick={handleGoBack}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
