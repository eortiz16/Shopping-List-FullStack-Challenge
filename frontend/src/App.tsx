import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ShoppingListPage from './pages/ShoppingListPage/ShoppingListPage';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ShoppingListPage />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
