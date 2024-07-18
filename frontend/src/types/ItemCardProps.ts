import { Item } from './Item';

/**
 * Props for the ItemCard Component
 */
export interface ItemCardProps {
  item: Item;
  onTogglePurchased: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}
