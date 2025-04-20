import { Button } from '@mantine/core';
import Header from '../../../components/header';
import { Link } from 'react-router';
import paths from '../../../config/paths';

function Landing() {
    return (
        <>
            <Header />
            <div>
                <Link to={paths.auth.login.getHref()}>
                    <Button>Sign In</Button>
                </Link>
            </div>
            <div className="mt-5">
                <Link to={paths.auth.register.getHref()}>
                    <Button>Register</Button>
                </Link>
            </div>
        </>
    );
}

export default Landing;
