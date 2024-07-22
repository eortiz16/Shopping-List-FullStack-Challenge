import React from 'react';

import NavBar from '../../components/NavBar/NavBar';
import ShoppingList from '../../components/ShoppingList/ShoppingList';
import './ShoppingListPage.scss';

/**
 * ShoppingListPage component serves as the main page for the shopping list application.
 * It includes the navigation bar and the shopping list components, and applies page-specific styling.
 *
 * @returns {JSX.Element} The rendered shopping list page component.
 */
const ShoppingListPage: React.FC = () => {
  return (
    <div className="shopping-list-page">
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="content">
        <ShoppingList />
      </div>
    </div>
  );
};

export default ShoppingListPage;
