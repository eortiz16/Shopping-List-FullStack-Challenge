import React, { useEffect, useState, useCallback } from 'react';

import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Box,
} from '@mui/material';

import { CHARACTER_LIMIT, quantityOptions } from '../../config/config';
import ModalActions from '../../shared/ModalActions/ModalActions';
import { EditItemContentProps } from '../../types/EditItemContentProps';
import { ModalType } from '../../types/ModalType';
import '../../styles/modal-content.scss';

/**
 * EditItemContent component provides a form for editing an existing item in the shopping list.
 * It includes fields for the item name, description, quantity, and a checkbox for purchase status.
 *
 * @param {Object} props - The props object.
 * @param {Function} props.handleCancel - The function to cancel the edit item action.
 * @param {Function} props.handleEditItem - The function to edit the item in the list.
 * @param {Object} props.item - The item object containing the current item details.
 *
 * @returns {JSX.Element} The rendered edit item content component.
 */
const EditItemContent: React.FC<EditItemContentProps> = ({
  handleCancel,
  handleEditItem,
  item,
}) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (item) {
      setItemName(item.name);
      setDescription(item.description);
      setQuantity(item.quantity);
      setChecked(item.purchased);
    }
  }, [item]);

  const handleSubmit = useCallback(() => {
    const updatedItem = {
      name: itemName,
      description,
      quantity: Number(quantity),
      purchased: checked,
    };

    handleEditItem(item.id, updatedItem);
    handleCancel();
  }, [
    itemName,
    description,
    quantity,
    checked,
    handleEditItem,
    handleCancel,
    item.id,
  ]);

  return (
    <Box className="modal-content">
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Typography variant="h6" className="modal-title">
            Edit an Item
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="modal-subtitle">
            Edit your item below
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
              id="edit-item-name"
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
              id="edit-item-description"
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
              id="edit-item-quantity"
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option} id={String(option)}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  name="checked"
                  color="primary"
                  className="custom-checkbox"
                  id="checkbox"
                />
              }
              className="custom-checkbox-label"
              label="Purchased"
              id="edit-item-purchased"
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <ModalActions
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          mode={ModalType.EDIT}
        />
      </Box>
    </Box>
  );
};

export default React.memo(EditItemContent);
