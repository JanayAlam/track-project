import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormHeader from '../../../components/shared/auth-form-header';
import Card from '../../../components/shared/card';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        document.title = `Track Project | Register`;
        if (isAuthenticated) return navigate('/');
    }, []);

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader
                    headerText={'Register a new account'}
                    helpText={
                        "Let's begin the adventure by filling up the following form"
                    }
                />
            </Card>
        </Container>
    );
};

export default Register;

