import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, MenuItem, Grid } from '@mui/material';
import { AddItemContentProps } from '../../types/AddItemContentProps';
import ModalActions from '../../shared/ModalActions/ModalActions';
import './AddItemContent.scss';
import { ModalType } from '../../types/ModalType';

const AddItemContent: React.FC<AddItemContentProps> = ({ handleAddItem, handleCancel }) => {
  const quantityOptions: number[] = [1, 2, 3];
  const CHARACTER_LIMIT: number = 100;

  const [itemName, setItemName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number | undefined>(undefined);

  const handleSubmit = () => {
    if (itemName && description && quantity !== undefined) {
      handleAddItem({ name: itemName, description, quantity });
    }
  };

  return (
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
      <Box>
        <ModalActions handleCancel={handleCancel} handleSubmit={handleSubmit} mode={ModalType.ADD}/>
      </Box>
    </Box>
  );
};

export default AddItemContent;
