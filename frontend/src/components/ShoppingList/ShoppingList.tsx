import React, { useEffect, useState, useCallback } from 'react';
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
import ErrorComponent from '../../shared/ErrorComponent/ErrorComponent';

/**
 * ShoppingList component manages the overall shopping list.
 * It fetches items from the server, handles loading and error states,
 * and provides functionality to add, edit, and delete items.
 *
 * @returns {JSX.Element} The rendered shopping list component.
 */
const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(shoppingListData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const handleOpenAddModal = useCallback(() => setOpenAddModal(true), []);
  const handleCloseAddModal = useCallback(() => setOpenAddModal(false), []);

  const handleAddItem = useCallback(
    async (item: Omit<Item, 'id' | 'purchased'>) => {
      try {
        const newItem = await addItem({ ...item, purchased: false });
        setItems((prevItems) => [...prevItems, newItem]);
        setOpenAddModal(false);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    []
  );

  const handleDeleteItem = useCallback(async (id: number) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const handleEditItem = useCallback(
    async (id: number, updatedItem: Partial<Item>) => {
      try {
        const savedItem = await editItem(id, updatedItem);
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? savedItem : item))
        );
      } catch (err) {
        setError((err as Error).message);
      }
    },
    []
  );

  if (loading) return <Loading />;
  if (error) return <ErrorComponent errorMessage={error} />;

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

export default React.memo(ShoppingList);
