import React from 'react';

import { Box, Card, CardContent, Typography, Button } from '@mui/material';

import { EmptyListComponentProps } from '../../types/EmptyListComponentProps';
import './EmptyListComponent.scss';

/**
 * EmptyListComponent displays a message indicating that the shopping list is empty.
 * It provides a button to add the first item to the list.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.handleOpenAdd - The function to open the modal for adding a new item.
 *
 * @returns {JSX.Element} The rendered empty list component.
 */
const EmptyListComponent: React.FC<EmptyListComponentProps> = ({
  handleOpenAdd,
}) => {
  return (
    <Box className="empty-list-container">
      <Card className="empty-list-card">
        <CardContent>
          <Typography
            variant="body1"
            component="div"
            className="empty-list-text"
          >
            {`Your shopping list is empty :(`}
          </Typography>
          <Button
            variant="contained"
            className="empty-list-button"
            onClick={handleOpenAdd}
          >
            Add your first item
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(EmptyListComponent);
