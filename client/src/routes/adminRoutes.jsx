import { lazy } from 'react';
import AdminLayout from '../components/Admin/AdminLayout';

// Lazy load components for better performance
const Dashboard = lazy(() => import('../components/Admin/Dashboard'));
const UserList = lazy(() => import('../components/Admin/User/UserList'));
const UserForm = lazy(() => import('../components/Admin/User/UserForm'));
const UserDetails = lazy(() => import('../components/Admin/User/UserDetails'));
const BulkUserUpload = lazy(() => import('../components/Admin/User/BulkUserUpload'));
const ProgramList = lazy(() => import('../components/Admin/Program/ProgramList'));
const ProgramForm = lazy(() => import('../components/Admin/Program/ProgramForm'));
const ProgramDetails = lazy(() => import('../components/Admin/Program/ProgramDetails'));
const Analytics = lazy(() => import('../components/Admin/Analytics'));
const Messages = lazy(() => import('../components/Admin/Messages'));
const Settings = lazy(() => import('../components/Admin/Settings'));

const adminRoutes = [
  {
    path: '/dashboard/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // User Management Routes
      { path: 'users', element: <UserList /> },
      { path: 'users/new', element: <UserForm /> },
      { path: 'users/import', element: <BulkUserUpload /> },
      { path: 'users/:id', element: <UserDetails /> },
      { path: 'users/:id/edit', element: <UserForm editMode /> },
      
      // Program Management Routes
      { path: 'programs', element: <ProgramList /> },
      { path: 'programs/new', element: <ProgramForm /> },
      { path: 'programs/:id', element: <ProgramDetails /> },
      { path: 'programs/:id/edit', element: <ProgramForm editMode /> },
      
      // Other Routes
      { path: 'analytics', element: <Analytics /> },
      { path: 'messages', element: <Messages /> },
      { path: 'settings', element: <Settings /> },
      
      // Fallback route
      { path: '*', element: <Dashboard /> },
    ],
  },
];

export default adminRoutes;
