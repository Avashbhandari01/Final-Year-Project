import { useRoutes, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';

// Pages
import BlogPage from '../pages/BlogPage';
import UserPage from '../pages/UserPage';
import Page404 from '../pages/Page404';
import ProductsPage from '../pages/ProductsPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
// import PrivateRoutes from './protectedRoute';

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <LandingPage />,
            index: true
        },
        {
            path: 'login',
            element: <Login />

        },
        {
            path: 'admin-login',
            element: <AdminLogin />
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app"/> },
                { path: 'app', element: <DashboardAppPage /> },
                { path: 'user', element: <UserPage /> },
                { path: 'chat', element: <ProductsPage /> },
                { path: 'blog', element: <BlogPage /> },
            ],
        },
        {
            element: <SimpleLayout />,
            children: [
              { element: <Navigate to="/dashboard/app" />, index: true },
              { path: '404', element: <Page404 /> },
              { path: '*', element: <Navigate to="/404" /> },
            ],
          },
    ])
    return routes
}

