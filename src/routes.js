// import { Navigate, Outlet } from 'react-router-dom';

import { LoginLayout, DashboardLayout } from './layouts'

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? <DashboardLayout /> : <LoginLayout />,
  }
];

export default routes;