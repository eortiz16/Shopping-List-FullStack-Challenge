import React, { useState, useCallback } from 'react';

import { TextField, MenuItem, Grid, Box, Typography } from '@mui/material';

import { CHARACTER_LIMIT, quantityOptions } from '../../config/config';
import ModalActions from '../../shared/ModalActions/ModalActions';
import { AddItemContentProps } from '../../types/AddItemContentProps';
import { ModalType } from '../../types/ModalType';
import '../../styles/modal-content.scss';

/**
 * AddItemContent component provides a form for adding a new item to the shopping list.
 * It includes fields for the item name, description, and quantity.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.handleAddItem - The function to add the item to the list.
 * @param {Function} props.handleCancel - The function to cancel the add item action.
 *
 * @returns {JSX.Element} The rendered add item content component.
 */
const AddItemContent: React.FC<AddItemContentProps> = ({
  handleAddItem,
  handleCancel,
}) => {
  const [itemName, setItemName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = useCallback(() => {
    const quantityNumber = Number(quantity);
    if (itemName && quantityNumber > 0) {
      handleAddItem({ name: itemName, description, quantity: quantityNumber });
    }
  }, [itemName, description, quantity, handleAddItem]);

  return (
    <Box className="modal-content">
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Typography variant="h6" className="modal-title">
            Add an Item
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="modal-subtitle">
            Add your new item below
          </Typography>
        </Grid>
      </Grid>
      <Box className="modal-form-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Item Name"
              variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="modal-textfield"
              id="add-item-name"
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
                className: 'modal-helper-text',
              }}
              className="modal-textfield"
              id="add-item-description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="How many?"
              variant="outlined"
              select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="modal-textfield"
              id="add-item-quantity"
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option} id={String(option)}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <ModalActions
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          mode={ModalType.ADD}
        />
      </Box>
    </Box>
  );
};

export default React.memo(AddItemContent);
