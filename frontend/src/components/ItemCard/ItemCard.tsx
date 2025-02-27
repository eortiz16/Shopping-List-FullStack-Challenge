import React from 'react';

import { Card, Box, Checkbox, Typography, IconButton } from '@mui/material';

import { ItemCardProps } from '../../types/ItemCardProps';
import './ItemCard.scss';

/**
 * ItemCard component represents a single item in the shopping list.
 * It displays the item's name, description, due date, and purchased status.
 * Users can toggle the purchased status, edit the item, or delete the item
 * using the respective actions provided as props.
 *
 * @param {Object} props - The props object.
 * @param {Item} props.item - The item object containing id, name, description, due_date, and purchased status.
 * @param {Function} props.handlePurchased - The function to toggle the purchased status of the item.
 * @param {Function} props.onEdit - The function to edit the item.
 * @param {Function} props.onDelete - The function to delete the item.
 *
 * @returns {JSX.Element} The rendered item card component.
 */
const ItemCard: React.FC<ItemCardProps> = ({
  item,
  handlePurchased,
  onEdit,
  onDelete,
}) => {
  // Format the due date to the local timezone
  const formattedDueDate = item.due_date 
    ? new Date(item.due_date).toLocaleDateString(undefined, { timeZone: 'UTC' })
    : 'No due date';

  return (
    <Card
      className={`item-card ${item.purchased ? 'purchased' : ''}`}
      sx={{ boxShadow: 'none' }}
    >
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={item.purchased}
          onChange={() => handlePurchased(item.id)}
          classes={{ root: 'custom-checkbox' }}
          id={String(item.id)}
        />
        <Box className="item-card-text-container">
          <Typography variant="h6" className="item-name">
            {item.name}
          </Typography>
          <Typography variant="body1" className="item-description">
            {item.description}
          </Typography>
          <Typography variant="body2" className="item-due-date">
            Due Date: {formattedDueDate}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => onEdit(item)}>
          <div className="material-icons-outlined">edit</div>
        </IconButton>
        <IconButton onClick={() => onDelete(item)}>
          <div className="material-icons-outlined">delete</div>
        </IconButton>
      </Box>
    </Card>
  );
};

export default React.memo(ItemCard);
