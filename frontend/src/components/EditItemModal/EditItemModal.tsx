import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { EditItemModalProps } from '../../types/EditItemModalProps';
import {
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import './EditItemModal.scss';

/**
 * EditItemModal component allows users to edit the details of an existing item in the shopping list.
 * It provides fields to modify the item's name, description, quantity, and purchase status.
 *
 * @param {Object} props - The props object.
 * @param {boolean} props.open - The state to control the modal's open/close status.
 * @param {Function} props.handleClose - The function to close the modal.
 * @param {Item} props.item - The item object containing id, name, description, quantity, and purchased status.
 *
 * @returns {JSX.Element} The rendered edit item modal component.
 */
const EditItemModal: React.FC<EditItemModalProps> = ({
  open,
  handleClose,
  item,
}) => {
  // Predefined array for quantity options
  const quantityOptions: number[] = [1, 2, 3];
  const CHARACTER_LIMIT: number = 100;

  const [itemName, setItemName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState<number | string>('');
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setDescription(item.description);
      setQuantity(item.quantity);
      setChecked(item.purchased);
    }
  }, [item]);

  const handleSubmit = () => {
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
      <Box className="edit-modal-box">
        <AppBar position="static" sx={{ boxShadow: 'none' }}>
          <Toolbar className="edit-modal-app-bar">
            <Typography variant="h6" className="edit-modal-app-bar-text">
              SHOPPING LIST
            </Typography>
            <IconButton
              edge="end"
              onClick={handleClose}
              aria-label="close"
              className="edit-modal-app-bar-button"
            >
              <div className="material-icons">skip_next</div>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box className="edit-modal-content">
          <Typography variant="h6" className="edit-modal-title">
            Edit Item
          </Typography>
          <Typography className="edit-modal-subtitle">
            Modify your item below
          </Typography>
          <Box className="edit-modal-form">
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ mb: 2 }}
            />
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
                className: 'edit-modal-helper-text',
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="How many?"
              variant="outlined"
              select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ mb: 2 }}
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
          </Box>
        </Box>
        <Box className="edit-modal-actions">
          <Button onClick={handleClose} className="edit-modal-actions-button">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            className="edit-modal-actions-button"
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditItemModal;
