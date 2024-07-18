import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Item } from "../../types/Item";
import { AddItemModalProps } from '../../types/AddItemModalProps';
import { TextField, MenuItem, Button, Grid } from '@mui/material';
import './AddItemModal.scss';

/**
 * AddItemModal component provides a form for adding a new item to the shopping list.
 * It includes fields for the item's name, description, and quantity, and handles form submission.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.open - The state to control the modal's open/close status.
 * @param {Function} props.handleClose - The function to close the modal.
 * @param {Function} props.handleAddItem - The function to add a new item to the shopping list.
 *
 * @returns {JSX.Element} The rendered add item modal component.
 */
const AddItemModal: React.FC<AddItemModalProps> = ({ open, handleClose, handleAddItem }) => {
  // Predefined array for quantity options
  const quantityOptions: number[] = [1, 2, 3];
  const CHARACTER_LIMIT: number = 100;

  const [itemName, setItemName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number | undefined>(undefined);

  const handleSubmit = () => {
    // Handle form submission logic here
    const item : Item = {
      id: 0,
      name: itemName,
      description: description,
      quantity: quantity ?? 0,
      purchased: false
    }

    handleAddItem(item);
    handleClose();
    clearFields();
  };

  const clearFields = () => {
    setItemName('');
    setDescription('');
    setQuantity(undefined);
  };

  const handleCancel = () => {
    clearFields();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box className="add-modal-box">
        <AppBar position="static" sx={{ boxShadow: 'none' }}>
          <Toolbar className="add-modal-app-bar">
            <Typography variant="h6" className="add-modal-app-bar-text">
              SHOPPING LIST
            </Typography>
            <IconButton
              edge="end"
              onClick={handleCancel}
              aria-label="close"
              className="add-modal-app-bar-button"
            >
              <div className="material-icons">skip_next</div>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box className="add-modal-content">
          <Typography variant="h6" className="add-modal-title">
            Add an Item
          </Typography>
          <Typography className="add-modal-subtitle">
            Add your new item below
          </Typography>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Item Name"
                  variant="outlined"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{ maxLength: CHARACTER_LIMIT }}
                  helperText={`${description.length}/${CHARACTER_LIMIT}`}
                  FormHelperTextProps={{
                    className: 'add-modal-helper-text',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="How many?"
                  variant="outlined"
                  select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {quantityOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className="add-modal-actions">
          <Button onClick={handleCancel} className="add-modal-actions-button">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="add-modal-actions-button"
          >
            Add Task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
