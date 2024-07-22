import { Item } from "./Item";
import { ModalType } from "./ModalType";

/**
 * Props for the Modals component
 */
export interface ModalsProps {
    modalType: ModalType | null;
    selectedItem: Item | null;
    handleCloseModal: () => void;
    handleAddItem: (item: Omit<Item, 'id' | 'purchased'>) => Promise<void>;
    handleEditItem: (id: number, updatedItem: Partial<Item>) => Promise<void>;
    handleDeleteItem: (id: number) => Promise<void>;
}
