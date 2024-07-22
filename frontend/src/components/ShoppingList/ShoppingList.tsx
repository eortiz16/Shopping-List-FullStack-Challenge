import React, { useState, useCallback } from 'react';

import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import PopulatedListComponent from '../../components/PopulatedListComponent/PopulatedListComponent';
import { Item } from '../../types/Item';
import { ModalType } from '../../types/ModalType';
import { useFetchItems } from '../../utils/UseFetchItems';
import { useModalHandlers } from '../../utils/UseModalHandlers';
import LoadingErrorWrapper from '../LoadingErrorWrapper/LoadingErrorWrapper';
import Modals from '../Modals/Modals';

const ShoppingList: React.FC = () => {
  // Custom hook to fetch items from the server and manage state
  const { items, setItems, loading, error, setError } = useFetchItems();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  // Handler to close the modal and reset modalType and selectedItem states
  const handleCloseModal = useCallback(() => {
    setModalType(null);
    setSelectedItem(null);
  }, []);

  // Custom hook to handle adding, deleting, and editing items
  const { handleAddItem, handleDeleteItem, handleEditItem } = useModalHandlers(
    setItems,
    handleCloseModal,
    setError
  );

  /**
  * Handler to open different types of modals.
  *
  * @param {ModalType} type - The type of the modal to open.
  * @param {Item | null} [item=null] - The item to set as selected, if applicable.
  */
  const handleOpenModal = useCallback((type: ModalType, item: Item | null = null) => {
    setSelectedItem(item);
    setModalType(type);
  }, []);

  // Handler to toggle the purchased state of an item
  const handlePurchased = useCallback(
    (id: number) => {
      let updatedItem: Item | null = null;

      const updatedItems = items.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, purchased: !item.purchased };
          return updatedItem;
        }
        return item;
      });

      if (updatedItem) {
        setItems(updatedItems);
        handleEditItem(id, updatedItem);
      }
    },
    [items, setItems, handleEditItem]
  );


  return (
    <LoadingErrorWrapper loading={loading} error={error}>
      {items.length > 0 ? (
        <PopulatedListComponent
          items={items}
          handleOpenAdd={() => handleOpenModal(ModalType.ADD)}
          handleOpenEdit={(item) => handleOpenModal(ModalType.EDIT, item)}
          handleOpenDelete={(item) => handleOpenModal(ModalType.DELETE, item)}
          handlePurchased={handlePurchased}
        />
      ) : (
        <EmptyListComponent handleOpenAdd={() => handleOpenModal(ModalType.ADD)} />
      )}
      <Modals
        modalType={modalType}
        selectedItem={selectedItem}
        handleCloseModal={handleCloseModal}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
      />
    </LoadingErrorWrapper>
  );
};

export default React.memo(ShoppingList);
