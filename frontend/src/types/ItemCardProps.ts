import { Item } from './Item';

export interface ItemCardProps {
  item: Item;
  onTogglePurchased: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
}
