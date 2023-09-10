import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../../components/atoms/button';
import InputField from '../../../components/atoms/input-field';
import AuthFormHeader from '../../../components/shared/auth-form-header';
import Card from '../../../components/shared/card';
import LoadingButton from '../../../components/shared/loading-button';

const initialFormState = {
    email: '',
    password: '',
    remember: false,
};

const schema = Yup.object().shape({
    email: Yup.string().label('Email address').trim().required().email(),
    password: Yup.string().label('Password').trim().required().min(6),
    remember: Yup.bool().label('Remember me'),
});

const SignIn = () => {
    const { isLoading } = useStoreState((state) => state.auth);
    const authActions = useStoreActions((actions) => actions.auth);

    const navigate = useNavigate();

    const {
        control,
        reset,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: { ...initialFormState },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const result = await authActions.login({
            email: data.email,
            password: data.password,
        });
        if (result) {
            const errObject = { type: 'unauthorized', message: result };
            setError('email', errObject);
            setError('password', errObject);
            return;
        }
        navigate('/');
    };

    useEffect(() => {
        document.title = `Track Project | Sign in`;
    }, []);

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader
                    headerText={'Sign in to Track Project'}
                    helpText={
                        'Enter the email and password of your existing account'
                    }
                />
                <Container maxWidth="md" sx={{ mt: 1 }}>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name={'email'}
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label={'Email address'}
                                    type={'email'}
                                    error={
                                        errors.email ? errors.email.message : ''
                                    }
                                    required
                                    {...field}
                                    ref={null} // https://stackoverflow.com/a/68818397/11657172
                                />
                            )}
                        />
                        <Controller
                            name={'password'}
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label={'Password'}
                                    type={'password'}
                                    error={
                                        errors.password
                                            ? errors.password.message
                                            : ''
                                    }
                                    required
                                    mb={0}
                                    {...field}
                                    ref={null}
                                />
                            )}
                        />
                        <Controller
                            name={'remember'}
                            control={control}
                            render={({ field }) => (
                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                size="small"
                                                ref={null}
                                            />
                                        }
                                        label={'Remember me'}
                                    />
                                </FormControl>
                            )}
                        />
                        <Stack direction={'row'} gap={1}>
                            {isLoading ? (
                                <LoadingButton />
                            ) : (
                                <>
                                    <Button
                                        color={'warning'}
                                        onClick={() => reset()}
                                    >
                                        Reset
                                    </Button>
                                    <Button type={'submit'}>Sign in</Button>
                                </>
                            )}
                        </Stack>
                    </form>
                </Container>
            </Card>
        </Container>
    );
};

export default SignIn;

