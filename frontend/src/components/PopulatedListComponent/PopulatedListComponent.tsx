import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { PopulatedListComponentProps } from '../../types/PopulatedListComponentProps';
import ItemCard from '../ItemCard/ItemCard';
import './PopulatedListComponent.scss';

/**
 * PopulatedListComponent component manages and displays the list of items in the shopping list.
 * It allows users to add, edit, delete, and toggle the purchased status of items.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.items - The array of items in the shopping list.
 * @param {Function} props.handleOpenAdd - The function to open the add item modal.
 * @param {Function} props.handleOpenDelete - The function to open the delete item modal.
 * @param {Function} props.handleOpenEdit - The function to open the edit item modal.
 * @param {Function} props.handlePurchased - The function to toggle purchased items.
 *
 * @returns {JSX.Element} The rendered populated list component.
 */
const PopulatedListComponent: React.FC<PopulatedListComponentProps> = ({
  items,
  handleOpenAdd,
  handleOpenEdit,
  handleOpenDelete,
  handlePurchased,
}) => {
  // Sort items by ascending id
  const sortedItems = items.slice().sort((a, b) => a.id - b.id);

  return (
    <div className="parent-container">
      <div className="populated-list-container">
        <Box className="header">
          <Typography variant="h6" className="header-title">
            Your Items
          </Typography>
          <Button variant="contained" onClick={handleOpenAdd}>
            Add Item
          </Button>
        </Box>
        <Box className="items-list">
          {sortedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              handlePurchased={handlePurchased}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default React.memo(PopulatedListComponent);
