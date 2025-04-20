import { useNavigate } from 'react-router';
import Header from '../../../components/header';
import LoginForm from '../../../features/auth/login/components/login-form';
import paths from '../../../config/paths';

function Login() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <LoginForm
                onSuccess={(data) => {
                    navigate(paths[data.role].dashboard.getHref());
                }}
            />
        </>
    );
}

export default Login;
