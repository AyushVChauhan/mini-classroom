import { useNavigate } from 'react-router';
import Header from '../../../components/header';
import RegisterForm from '../../../features/auth/register/components/register-form';
import paths from '../../../config/paths';

function Register() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <RegisterForm
                onSuccess={() => {
                    navigate(paths.auth.login.getHref());
                }}
            />
        </>
    );
}

export default Register;
