import { Button, FormControl, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import AuthFormHeader from '../../../components/shared/auth-form-header';
import Card from '../../../components/shared/card';

const SignIn = () => {
    useEffect(() => {
        document.title = `Track Project | Sign in`;
    }, []);

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader
                    headerText="Sign in to Track Project"
                    helpText="Enter the email and password of your existing account"
                />
                <Container maxWidth="md" sx={{ mt: 1 }}>
                    <form method="POST">
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                variant={'outlined'}
                                label={'Email address'}
                                type={'email'}
                                size={'small'}
                                required
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label={'Password'}
                                variant={'outlined'}
                                required
                                size={'small'}
                                type={'password'}
                            />
                        </FormControl>
                        <Button
                            variant={'contained'}
                            size={'small'}
                            sx={{ px: 3 }}
                            type={'submit'}
                        >
                            Sign in
                        </Button>
                    </form>
                </Container>
            </Card>
        </Container>
    );
};

export default SignIn;
