import { Outlet } from 'react-router';
import Header from './header';

function AuthLayout() {
    return (
        <>
            <Header showProfile />
            <Outlet />
        </>
    );
}

export default AuthLayout;
