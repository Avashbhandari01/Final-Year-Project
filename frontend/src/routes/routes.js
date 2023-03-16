import { useRoutes, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';

import AttendancePage from '../pages/AttendancePage';
import UserPage from '../pages/UserPage';
import Page404 from '../pages/Page404';
import ChatPage from '../pages/ChatPage';
import DashboardAppPage from '../pages/DashboardAppPage';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import AdminLogin from '../pages/AdminLogin';
import CalendarPage from '../pages/Calendar';
// import RoutinePage from '../pages/RoutinePage';
import ExcelRoutinePage from '../pages/ExcelRoutinePage';
import NotificationPage from '../pages/NotificationPage';
import AssignmentPage from '../pages/AssignmentPage';
import FeeDetailsPage from '../pages/FeeDetails';
import FeedbackPage from '../pages/Feedback';
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
                { path: 'chat', element: <ChatPage /> },
                { path: 'attendance', element: <AttendancePage /> },
                { path: 'calendar', element: <CalendarPage /> },
                { path: 'routine', element: <ExcelRoutinePage /> },
                { path: 'notification', element: <NotificationPage /> },
                { path: 'assignments', element: <AssignmentPage /> },
                { path: 'feedetails', element: <FeeDetailsPage /> },
                { path: 'feedback', element: <FeedbackPage /> },
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

