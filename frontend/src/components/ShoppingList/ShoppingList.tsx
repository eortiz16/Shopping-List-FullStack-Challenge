import * as React from 'react';
import { useState } from 'react';
import EmptyListComponent from '../../components/EmptyListComponent/EmptyListComponent';
import PopulatedListComponent from '../../components/PopulatedListComponent/PopulatedListComponent';
import shoppingListData from '../../mock/shoppingList';
import AddItemModal from '../AddItemModal/AddItemModal';
import { Item } from '../../types/Item';
import './ShoppingList.scss';

/**
 * ShoppingList is the main component of the application, responsible for managing the core logic
 * and state of the shopping list. It features both the empty and populated shopping cart views.
 * This component initializes the mock items and passes them down to child components.
 * All core functionalities, such as adding, editing, and deleting items, as well as managing the
 * shopping list state, are handled here.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ShoppingList: React.FC = () => {
    const [items, setItems] = useState(shoppingListData);
    const [openAdd, setOpenAdd] = useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleAddItem = (item: Item) => {
        // Temporary Add Item
        setItems((prevItems) => [
            ...prevItems,
            { ...item, id: prevItems.length ? prevItems[prevItems.length - 1].id + 1 : 1 },
        ]);
        setOpenAdd(false);
    }

    const handleDeleteItem = (id: number) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <>
            {items.length > 0 ? (
                <PopulatedListComponent items={items} setItems={setItems} handleOpenAdd={handleOpenAdd} handleDeleteItem={handleDeleteItem} />
            ) : (
                <EmptyListComponent handleOpenAdd={handleOpenAdd} />
            )}
            <AddItemModal open={openAdd} handleClose={handleCloseAdd} handleAddItem={handleAddItem} />
        </>
    );
};

export default ShoppingList;
