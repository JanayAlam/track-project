import Container from '@mui/material/Container';
import { useEffect } from 'react';
import AuthFormHeader from '../../../components/shared/auth-form-header';
import Card from '../../../components/shared/card';

const Register = () => {
    useEffect(() => {
        document.title = `Track Project | Register`;
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
