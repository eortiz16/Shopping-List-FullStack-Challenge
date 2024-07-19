import React from 'react';
import { useState } from 'react';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import PopulatedListComponent from '../../components/PopulatedListComponent/PopulatedListComponent';
import shoppingListData from '../../mock/shoppingList';
import { Item } from '../../types/Item';
import './ShoppingList.scss';
import StyledModal from '../../shared/StyledModal/StyledModal';
import AddItemContent from '../AddItemContent/AddItemContent';

const ShoppingList: React.FC = () => {
    const [items, setItems] = useState<Item[]>(shoppingListData);
    const [openAddModal, setOpenAddModal] = useState(false);

    const handleOpenAddModal = () => setOpenAddModal(true);
    const handleCloseAddModal = () => setOpenAddModal(false);

    const handleAddItem = (item: Omit<Item, 'id' | 'purchased'>) => {
        const newItem: Item = {
            id: items.length ? items[items.length - 1].id + 1 : 1,
            ...item,
            purchased: false
        };
        setItems((prevItems) => [...prevItems, newItem]);
        setOpenAddModal(false);
    };

    const handleDeleteItem = (id: number) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <>
            {items.length > 0 ? (
                <PopulatedListComponent items={items} setItems={setItems} handleOpenAdd={handleOpenAddModal} handleDeleteItem={handleDeleteItem} />
            ) : (
                <EmptyListComponent handleOpenAdd={handleOpenAddModal} />
            )}
            <StyledModal
                open={openAddModal}
                handleCancel={handleCloseAddModal}
            >
                <AddItemContent handleAddItem={handleAddItem} handleCancel={handleCloseAddModal} />
            </StyledModal>
        </>
    );
};

export default ShoppingList;
