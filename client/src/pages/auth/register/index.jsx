import { yupResolver } from '@hookform/resolvers/yup';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from '../../../api/axios';
import Button from '../../../components/atoms/button';
import InputField from '../../../components/atoms/input-field';
import AuthFormHeader from '../../../components/shared/auth-form-header';
import Card from '../../../components/shared/card';
import LoadingButton from '../../../components/shared/loading-button';

const initialFormState = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
};

const schema = Yup.object().shape({
    username: Yup.string().label('Username').trim().required().max(25),
    email: Yup.string()
        .label('Email address')
        .trim()
        .required()
        .email()
        .max(120),
    password: Yup.string().label('Password').trim().required().min(6),
    password_confirmation: Yup.string()
        .label('Confirm Password')
        .trim()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Register = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = `Track Project | Register`;
    }, []);

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { ...initialFormState },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.post('/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            navigate('/signin');
        } catch (e) {
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader
                    headerText={'Register a new account'}
                    helpText={
                        "Let's begin the adventure by filling up the following form"
                    }
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'username'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Username'}
                                type={'text'}
                                error={
                                    errors.username
                                        ? errors.username.message
                                        : ''
                                }
                                required
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
                            />
                        )}
                    />
                    <Controller
                        name={'email'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Email address'}
                                type={'email'}
                                error={errors.email ? errors.email.message : ''}
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
                                {...field}
                                ref={null}
                            />
                        )}
                    />
                    <Controller
                        name={'password_confirmation'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Confirm Password'}
                                type={'password'}
                                error={
                                    errors.password_confirmation
                                        ? errors.password_confirmation.message
                                        : ''
                                }
                                required
                                {...field}
                                ref={null}
                            />
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
                                <Button type={'submit'}>Register</Button>
                            </>
                        )}
                    </Stack>
                </form>
            </Card>
        </Container>
    );
};

export default Register;

