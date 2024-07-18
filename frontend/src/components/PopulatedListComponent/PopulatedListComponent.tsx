import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AddItemModal from '../AddItemModal/AddItemModal';
import shoppingListData from '../../mock/shoppingList';
import ItemCard from '../ItemCard/ItemCard';
import EditItemModal from '../EditItemModal/EditItemModal';
import { Item } from '../../types/Item';
import './PopulatedListComponent.scss';

export default function PopulatedListComponent() {
  const [items, setItems] = useState(shoppingListData);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (item: Item) => {
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setSelectedItem(null);
    setOpenEdit(false);
  };

  const handleTogglePurchased = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Box className="populated-list-container">
      <Box className="header">
        <Typography variant="h5" component="div">
          Your Items
        </Typography>
        <Button variant="contained" onClick={handleOpenAdd}>
          Add Item
        </Button>
      </Box>
      <Box className="items-list">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onTogglePurchased={handleTogglePurchased}
            onEdit={() => handleOpenEdit(item)}
            onDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </Box>
      <AddItemModal open={openAdd} handleClose={handleCloseAdd} />
      {selectedItem && (
        <EditItemModal
          open={openEdit}
          handleClose={handleCloseEdit}
          item={selectedItem}
        />
      )}
    </Box>
  );
}
