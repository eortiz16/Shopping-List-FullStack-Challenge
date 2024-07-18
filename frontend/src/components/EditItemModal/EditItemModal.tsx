import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { GenericsModalProps } from '../../types/GenericsModalProps';
import { TextField, MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import './EditItemModal.scss';

const EditItemModal: React.FC<GenericsModalProps> = ({
  open,
  handleClose,
}) => {
  // Predefined array for quantity options
  const quantityOptions = [1, 2, 3];

  const CHARACTER_LIMIT = 100;

  const [itemName, setItemName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Item Name:', itemName);
    console.log('Description:', description);
    console.log('Quantity:', quantity);
    console.log('Checked:', checked);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <AppBar position="static" sx={{ boxShadow: 'none' }}>
          <Toolbar className="modal-app-bar">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: '#4F4F4F' }}
              className="modal-app-bar-text"
            >
              SHOPPING LIST
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: 'black' }}
            >
              <div className="material-icons">skip_next</div>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box className="modal-content">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 2 }}
          >
            Add an Item
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, color: '#757575' }}
          >
            Add your new item below
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="item-name"
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="description"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{ maxLength: 100 }}
              helperText={`${description.length}/${CHARACTER_LIMIT}`}
              FormHelperTextProps={{ sx: { textAlign: 'right' }, className: 'helper-text' }}
            />
            <TextField
              fullWidth
              margin="normal"
              id="quantity"
              label="How many?"
              variant="outlined"
              select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label="Purchase"
            />
            <Box className="modal-actions">
              <Button onClick={handleClose} sx={{ textTransform: 'none' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Add Task
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
