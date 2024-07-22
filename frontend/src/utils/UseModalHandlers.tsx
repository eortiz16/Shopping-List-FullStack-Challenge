import { useCallback } from 'react';

import { addItem, deleteItem, editItem } from '../services/itemService';
import { Item } from '../types/Item';

/**
 * Custom hook that provides handlers for modal operations (add, delete, edit items).
 *
 * @param {React.Dispatch<React.SetStateAction<Item[]>>} setItems - State setter function for updating the list of items.
 * @param {() => void} handleCloseModal - Function to close the opened modal.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} setError - State setter function for updating the error message.
 * @returns {Object} Handlers for adding, deleting, and editing items.
 */
export const useModalHandlers = (
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  handleCloseModal: () => void,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  // Adds a new item to the list and updates the state.
  const handleAddItem = useCallback(
    async (item: Omit<Item, 'id' | 'purchased'>) => {
      try {
        const newItem = await addItem({ ...item, purchased: false });
        setItems((prevItems) => [...prevItems, newItem]);
        handleCloseModal();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [handleCloseModal, setItems, setError]
  );

  // Deletes an item from the list and updates the state.
  const handleDeleteItem = useCallback(
    async (id: number) => {
      try {
        await deleteItem(id);
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        handleCloseModal();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [handleCloseModal, setItems, setError]
  );

  // Edits an existing item in the list and updates the state.
  const handleEditItem = useCallback(
    async (id: number, updatedItem: Partial<Item>) => {
      try {
        const savedItem = await editItem(id, updatedItem);
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? savedItem : item))
        );
        handleCloseModal();
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [handleCloseModal, setItems, setError]
  );

  return { handleAddItem, handleDeleteItem, handleEditItem };
};
