import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from '../../api/axios';
import Button from '../../components/atoms/button';
import InputField from '../../components/atoms/input-field';
import AuthFormHeader from '../../components/shared/auth-form-header';
import Card from '../../components/shared/card';
import LoadingButton from '../../components/shared/loading-button';
import useAuth from '../../hooks/useAuth';

const initialFormState = {
    first_name: '',
    last_name: '',
    gender: '',
    bio: '',
};

const schema = Yup.object().shape({
    first_name: Yup.string().label('First name').trim().required().max(20),
    last_name: Yup.string().label('Last name').trim().required().max(20),
    gender: Yup.string().label('Gender').trim().required().max(1),
    bio: Yup.string().label('Bio').trim(),
});

const CreateProfile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const { data: authData } = useStoreState((states) => states.auth);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = `Track Project | Create Profile`;
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
            await axios.post(
                '/profiles',
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    gender: data.gender,
                    bio: data.bio,
                },
                {
                    headers: {
                        Authorization: authData.accessToken,
                    },
                }
            );
            // await refreshUser();
            await logout();
            navigate('/signin');
        } catch (e) {
            e.response ? alert(e.response.data.error) : alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader headerText={'Create a new profile'} />
                <Box sx={{ mb: 2 }}></Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'first_name'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'First name'}
                                type={'text'}
                                error={
                                    errors.first_name
                                        ? errors.first_name.message
                                        : ''
                                }
                                required
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
                            />
                        )}
                    />
                    <Controller
                        name={'last_name'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Last name'}
                                type={'text'}
                                error={
                                    errors.last_name
                                        ? errors.last_name.message
                                        : ''
                                }
                                required
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
                            />
                        )}
                    />
                    <Controller
                        name={'gender'}
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    label="Gender"
                                    size="small"
                                    {...field}
                                    ref={null} // https://stackoverflow.com/a/68818397/11657172
                                >
                                    <MenuItem value={'M'}>Male</MenuItem>
                                    <MenuItem value={'F'}>Female</MenuItem>
                                    <MenuItem value={'O'}>Other</MenuItem>
                                </Select>
                                {errors.gender && (
                                    <Typography
                                        variant={'caption'}
                                        color={'error'}
                                    >
                                        {errors.gender.message}
                                    </Typography>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name={'bio'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Bio'}
                                type={'text'}
                                error={errors.bio ? errors.bio.message : ''}
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
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
                                <Button type={'submit'}>Create profile</Button>
                            </>
                        )}
                    </Stack>
                </form>
            </Card>
        </Container>
    );
};

export default CreateProfile;
