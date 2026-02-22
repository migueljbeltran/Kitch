import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import InventoryPage from './pages/InventoryPage';
import ShoppingPage from './pages/ShoppingPage';
import RecipePage from './pages/RecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <InventoryPage /> },
      { path: 'shopping', element: <ShoppingPage /> },
      { path: 'recipes', element: <RecipePage /> },
      { path: 'recipes/:id', element: <RecipeDetailPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
