import axios, { isAxiosError } from 'axios';

import { Item } from '../types/Item';

// Base URL for the API, fetched from environment variables or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/shopping-list-api/v1';

// Create an axios instance with the base URL for items endpoint
const api = axios.create({
  baseURL: `${API_URL}/items`,
});

/**
 * Handle errors from API requests.
 * Logs the error message and throws an error.
 * 
 * @param error - The error object from request
 * @throws An Error with a relevant message
 */
const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    console.error('API error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected error:', error);
  }
};

/**
 * Fetches the list of items from the API.
 * 
 * @returns A promise that resolves to an array of Item objects
 */
export const getItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>('');
    return response.data;
  } catch (error) {
    handleError(error);
    return [] as Item[];
  }
};

/**
 * Adds a new item to the API.
 * 
 * @param item - The item object to be added, excluding the id
 * @returns A promise that resolves to the added Item object
 */
export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    const response = await api.post<Item>('', item);
    return response.data;
  } catch (error) {
    handleError(error);
    return {} as Item;
  }
};

/**
 * Edits an existing item in the API.
 * 
 * @param id - The id of the item to be edited
 * @param item - The partial item object containing updated properties
 * @returns A promise that resolves to the updated Item object
 */
export const editItem = async (id: number, item: Partial<Item>): Promise<Item> => {
  try {
    const response = await api.put<Item>(`/${id}`, item);
    return response.data;
  } catch (error: unknown) {
    handleError(error);
    return {} as Item;
  }
};

/**
 * Deletes an item from the API.
 * 
 * @param id - The id of the item to be deleted
 * @returns A promise that resolves to void
 */
export const deleteItem = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    handleError(error);
    return;
  }
};
