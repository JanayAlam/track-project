import { yupResolver } from '@hookform/resolvers/yup';
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

const initialFormState = {
    title: '',
    summary: '',
    repo_url: '',
};

const schema = Yup.object().shape({
    title: Yup.string().label('Title').trim().required(),
    summary: Yup.string().label('Summary').trim().required(),
    repo_url: Yup.string().label('Repository URL').trim().url(),
});

const CreateProject = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const { data: authData } = useStoreState((states) => states.auth);

    useEffect(() => {
        document.title = 'Track Project | Create Project';
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
                '/projects',
                {
                    title: data.title,
                    summary: data.summary,
                    repo_url: data.repo_url,
                },
                {
                    headers: {
                        Authorization: authData.accessToken,
                    },
                }
            );
            navigate('/');
        } catch (e) {
            alert(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Card>
                <AuthFormHeader headerText={'Create a new Project'} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name={'title'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Title'}
                                type={'text'}
                                error={errors.title ? errors.title.message : ''}
                                required
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
                            />
                        )}
                    />
                    <Controller
                        name={'summary'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Summary'}
                                type={'text'}
                                error={
                                    errors.summary ? errors.summary.message : ''
                                }
                                required
                                {...field}
                                ref={null} // https://stackoverflow.com/a/68818397/11657172
                            />
                        )}
                    />
                    <Controller
                        name={'repo_url'}
                        control={control}
                        render={({ field }) => (
                            <InputField
                                label={'Repository URL'}
                                type={'text'}
                                error={
                                    errors.repo_url
                                        ? errors.repo_url.message
                                        : ''
                                }
                                required
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
                                <Button type={'submit'}>Create Project</Button>
                            </>
                        )}
                    </Stack>
                </form>
            </Card>
        </Container>
    );
};

export default CreateProject;
