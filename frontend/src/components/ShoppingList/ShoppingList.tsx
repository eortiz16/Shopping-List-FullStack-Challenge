import React, { useEffect } from 'react';
import { useState } from 'react';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import PopulatedListComponent from '../../components/PopulatedListComponent/PopulatedListComponent';
import shoppingListData from '../../mock/shoppingList';
import { Item } from '../../types/Item';
import StyledModal from '../../shared/StyledModal/StyledModal';
import AddItemContent from '../AddItemContent/AddItemContent';
import {
  getItems,
  addItem,
  deleteItem,
  editItem,
} from '../../services/itemService';
import Loading from '../../shared/LoadingComponent/LoadingComponent';
import './ShoppingList.scss';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(shoppingListData);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState<string | null>(null); // Add an error state
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleAddItem = async (item: Omit<Item, 'id' | 'purchased'>) => {
    try {
      const newItem = await addItem({ ...item, purchased: false });
      setItems((prevItems) => [...prevItems, newItem]);
      setOpenAddModal(false);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEditItem = async (id: number, updatedItem: Partial<Item>) => {
    try {
      const savedItem = await editItem(id, updatedItem);
      setItems((prevItems) =>
        // If the item's id matches the given id, replace it with the savedItem.
        // Otherwise, keep the item as is.
        prevItems.map((item) => (item.id === id ? savedItem : item))
      );
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {items.length > 0 ? (
        <PopulatedListComponent
          items={items}
          setItems={setItems}
          handleOpenAdd={handleOpenAddModal}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        />
      ) : (
        <EmptyListComponent handleOpenAdd={handleOpenAddModal} />
      )}
      <StyledModal open={openAddModal} handleCancel={handleCloseAddModal}>
        <AddItemContent
          handleAddItem={handleAddItem}
          handleCancel={handleCloseAddModal}
        />
      </StyledModal>
    </>
  );
};

export default ShoppingList;
