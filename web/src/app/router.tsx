import { createBrowserRouter, RouterProvider } from 'react-router';
import paths from '../config/paths';
import Login from './routes/auth/login';
import Register from './routes/auth/register';
import Landing from './routes/landing';
import { loginLoader } from '../features/auth/login/loader';
import AuthLayout from '../components/auth-layout';
import StudentDashboard from './routes/student/dashboard';
import TeacherDashboard from './routes/teacher/dashboard';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { userLoader } from '../api/user';
import { Role } from '../types/constants';

const createRouter = (queryClient: QueryClient) => {
    return createBrowserRouter([
        { path: paths.landing.path, element: <Landing /> },
        { path: paths.auth.login.path, element: <Login />, loader: loginLoader },
        { path: paths.auth.register.path, element: <Register />, loader: loginLoader },
        {
            path: paths.student.path,
            element: <AuthLayout />,
            loader: userLoader(queryClient, Role.STUDENT),
            children: [{ path: paths.student.dashboard.path, element: <StudentDashboard /> }],
        },
        {
            path: paths.teacher.path,
            element: <AuthLayout />,
            loader: userLoader(queryClient, Role.TEACHER),
            children: [{ path: paths.teacher.dashboard.path, element: <TeacherDashboard /> }],
        },
    ]);
};

function AppRouter() {
    const queryClient = useQueryClient();
    return <RouterProvider router={createRouter(queryClient)} />;
}

export default AppRouter;
