import { useState, useEffect } from 'react';

import { getItems } from '../services/itemService';
import { Item } from '../types/Item';

/**
 * Custom hook to fetch items from the server.
 * Manages loading, error, and items state.
 *
 * @returns {Object} The fetched items, state setters, loading state, and error state.
 */
export const useFetchItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * useEffect hook to fetch items from the server when the component mounts.
   * It sets the loading state initially and then attempts to fetch items.
   * If the fetch is successful, it updates the items state.
   * If there is an error, it sets the error state.
   * Finally, it sets the loading state to false.
   */
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

  return { items, setItems, loading, error, setError };
};
