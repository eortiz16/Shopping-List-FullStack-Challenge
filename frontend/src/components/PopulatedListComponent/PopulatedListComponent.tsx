import React, { useState, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ItemCard from '../ItemCard/ItemCard';
import DeleteItemModal from '../DeleteItemModal/DeleteItemModal';
import { Item } from '../../types/Item';
import { PopulatedListComponentProps } from '../../types/PopulatedListComponentProps';
import { ModalType } from '../../types/ModalType';
import './PopulatedListComponent.scss';
import StyledModal from '../../shared/StyledModal/StyledModal';
import EditItemContent from '../EditItemContent/EditItemContent';

const PopulatedListComponent: React.FC<PopulatedListComponentProps> = ({
  items,
  setItems,
  handleOpenAdd,
  handleDeleteItem,
  handleEditItem,
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const handleOpenModal = useCallback((type: ModalType) => {
    setModalType(type);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(null);
    setSelectedItem(null);
  }, []);

  const handleTogglePurchased = useCallback((id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    );
    setItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.id === id);
    if (updatedItem) {
      handleEditItem(id, updatedItem);
    }
  }, [items, setItems, handleEditItem]);

  const handleOpenEdit = useCallback((item: Item) => {
    setSelectedItem(item);
    handleOpenModal(ModalType.EDIT);
  }, [handleOpenModal]);

  const handleOpenDelete = useCallback((item: Item) => {
    setSelectedItem(item);
    handleOpenModal(ModalType.DELETE);
  }, [handleOpenModal]);

  const handleDeleteSelectedItem = useCallback(() => {
    if (selectedItem) {
      handleDeleteItem(selectedItem.id);
      handleCloseModal();
    }
  }, [selectedItem, handleDeleteItem, handleCloseModal]);

  return (
    <div className="parent-container">
      <div className="populated-list-container">
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
              onTogglePurchased={() => handleTogglePurchased(item.id)}
              onEdit={() => handleOpenEdit(item)}
              onDelete={() => handleOpenDelete(item)}
            />
          ))}
        </Box>

        {selectedItem && modalType === ModalType.EDIT && (
          <StyledModal
            key="edit-modal"
            open={modalType === ModalType.EDIT}
            handleCancel={handleCloseModal}
          >
            <EditItemContent
              handleCancel={handleCloseModal}
              item={selectedItem}
              handleEditItem={(id, updatedItem) => {
                handleEditItem(id, updatedItem);
                setItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === id ? { ...item, ...updatedItem } : item
                  )
                );
              }}
            />
          </StyledModal>
        )}
        {selectedItem && modalType === ModalType.DELETE && (
          <DeleteItemModal
            key="delete-modal"
            open={modalType === ModalType.DELETE}
            handleClose={handleCloseModal}
            onDelete={handleDeleteSelectedItem}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PopulatedListComponent);
