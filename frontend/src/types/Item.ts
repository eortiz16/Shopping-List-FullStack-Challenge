/**
 * Represents an item in the shopping list.
 *
 * @export
 * @interface Item
 */
export interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    purchased: boolean;
    due_date: Date;
  }