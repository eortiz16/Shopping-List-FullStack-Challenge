import React from 'react';
import { Card, Box, Checkbox, Typography, IconButton } from '@mui/material';
import { ItemCardProps } from '../../types/ItemCardProps';
import './ItemCard.scss';

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onTogglePurchased,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className={`item-card ${item.purchased ? 'purchased' : ''}`}>
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={item.purchased}
          onChange={() => onTogglePurchased(item.id)}
        />
        <Box ml={2}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" className="item-description">
            {item.description}
          </Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={onEdit}>
          <div className="material-icons">edit</div>
        </IconButton>
        <IconButton onClick={onDelete}>
          <div className="material-icons">delete</div>
        </IconButton>
      </Box>
    </Card>
  );
};

export default ItemCard;
