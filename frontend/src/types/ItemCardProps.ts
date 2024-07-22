import { Item } from './Item';

/**
 * Props for the ItemCard Component
 */
export interface ItemCardProps {
  item: Item;
  handlePurchased: (id: number) => void;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}
