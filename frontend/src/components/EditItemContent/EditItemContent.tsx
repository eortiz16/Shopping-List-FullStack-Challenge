import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EditItemContentProps } from '../../types/EditItemContentProps';
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import ModalActions from '../../shared/ModalActions/ModalActions';
import { ModalType } from '../../types/ModalType';
import './EditItemContent.scss';

const EditItemContent: React.FC<EditItemContentProps> = ({
  handleCancel,
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
    handleCancel();
  };

  return (

    <Box className="edit-modal-content">
      <Typography variant="h6" className="edit-modal-title">
        Edit Item
      </Typography>
      <Typography className="edit-modal-subtitle">
        Modify your item below
      </Typography>
      <Box className="edit-modal-form">
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
                className: 'edit-modal-helper-text',
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
              onChange={(e) => setQuantity(e.target.value)}
            >
              {quantityOptions.map((option) => (
                <MenuItem key={option} value={option}>
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
                />
              }
              label="Purchase"
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <ModalActions handleCancel={handleCancel} handleSubmit={handleSubmit} mode={ModalType.EDIT} />
      </Box>

    </Box>


  );
};

export default EditItemContent;
