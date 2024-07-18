import * as React from 'react';
import TopBar from '../components/TopBar/TopBar';
import EmptyListComponent from '../components/EmptyListComponent/EmptyListComponent';
import PopulatedListComponent from '../components/PopulatedListComponent/PopulatedListComponent';
import './ShoppingListPage.scss'; // Import CSS file for this page

export default function ShoppingListPage() {
  return (
    <div className="shopping-list-page">
      <TopBar />
      <div className="content">
        <PopulatedListComponent />
        {/* <EmptyListComponent /> */}
      </div>
    </div>
  );
}
