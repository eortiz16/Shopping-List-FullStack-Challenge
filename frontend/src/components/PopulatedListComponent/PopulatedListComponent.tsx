import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';
import EditItemModal from '../EditItemModal/EditItemModal';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import { Item } from '../../types/Item';
import { PopulatedListComponentProps } from '../../types/PopulatedListComponentProps';
import { ModalType } from '../../types/ModalType';
import './PopulatedListComponent.scss';

/**
 * PopulatedListComponent is responsible for rendering the populated shopping list.
 * This component allows users to add new items, edit existing items, and delete items
 * from the shopping list. It also handles toggling the purchased status of items.
 *
 * @param {Object} props - The props object.
 * @param {Item[]} props.items - The array of items in the shopping list.
 * @param {Function} props.setItems - The function to update the items state.
 * @param {Function} props.handleOpenAdd - The function to open the modal for adding a new item.
 * @param {Function} props.handleDeleteItem - The function to delete an item from the shopping list.
 *
 * @returns {JSX.Element} The rendered component.
 */
const PopulatedListComponent: React.FC<PopulatedListComponentProps> = ({
  items,
  setItems,
  handleOpenAdd,
  handleDeleteItem
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  
  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedItem(null);
  };


  const handleTogglePurchased = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  const handleOpenEdit = (item: Item) => {
    setSelectedItem(item);
    handleOpenModal(ModalType.EDIT);
  };

  const handleOpenDelete = (item: Item) => {
    setSelectedItem(item);
    handleOpenModal(ModalType.DELETE);
  };

  const handleDeleteSelectedItem = () => {
    if (selectedItem) {
      handleDeleteItem(selectedItem.id);
      handleCloseModal();
    }
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
            onDelete={() => handleOpenDelete(item)}
          />
        ))}
      </Box>

      {selectedItem && (
        <EditItemModal
          open={modalType === ModalType.EDIT}
          handleClose={handleCloseModal}
          item={selectedItem}
        />
      )}
      {selectedItem && (
        <DeleteItemModal
          open={modalType === ModalType.DELETE}
          handleClose={handleCloseModal}
          onDelete={handleDeleteSelectedItem}
        />
      )}
    </Box>
  );
};

export default PopulatedListComponent;
