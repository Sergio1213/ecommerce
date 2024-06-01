import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import Home from './components/Home';
import Closesesion from './components/Closesesion';
import './index.css';
import Shoppingcar from './components/Shoppingcar';
import Protect from './components/Protect';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Productview from './components/Productview';

import ErrorPage from './routes/ErrorPage';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/Home',
    element: <Home />,
  },
  {
    path: '/Shoppingcar',
    element: <ProtectedRoute element={<Shoppingcar />} />,
  },
  {
    path: '/Productview',
    element: <Productview />,
  },
  {
    path: '/closesesion',
    element: <Protect element={<Closesesion />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
);
