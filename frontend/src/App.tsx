import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import ShoppingListPage from './pages/ShoppingListPage';
import CssBaseline from '@mui/material/CssBaseline';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ShoppingListPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
