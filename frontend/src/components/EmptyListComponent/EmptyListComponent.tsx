import * as React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';
import AddItemModal from '../AddItemModal/AddItemModal';
import './EmptyListComponent.scss';

export default function EmptyListComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className="empty-list-container">
      <Card className="empty-list-card">
        <CardContent>
          <Typography
            variant="body1"
            component="div"
            className="empty-list-text"
          >
            Your shopping list is empty :(
          </Typography>
          <Button
            variant="contained"
            className="empty-list-button"
            onClick={handleOpen}
          >
            Add your first item
          </Button>
        </CardContent>
      </Card>
      <AddItemModal open={open} handleClose={handleClose} />
    </Box>
  );
}
