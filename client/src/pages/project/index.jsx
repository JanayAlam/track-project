import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axios from '../../api/axios';
import Button from '../../components/atoms/button';
import InputField from '../../components/atoms/input-field';
import Card from '../../components/shared/card';
import LoadingButton from '../../components/shared/loading-button';

const initialFormState = {
    title: '',
    details: '',
    label: '',
    deadline: '',
};

const schema = Yup.object().shape({
    title: Yup.string().label('Title').trim().required(),
    details: Yup.string().label('Details').trim().required(),
    label: Yup.string().label('Label').trim().required(),
    deadline: Yup.string().label('Deadline').trim(),
});

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { data: authData } = useStoreState((states) => states.auth);

    useEffect(() => {
        axios
            .get(`/projects/${id}`, {
                headers: {
                    Authorization: authData.accessToken,
                },
            })
            .then((data) => data.data)
            .then((res) => setProject(res.data))
            .catch((e) => alert(e.message));
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { ...initialFormState },
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });

    const onChangeHandler = (value, issueId) => {
        axios
            .patch(
                `/issues/i/status/${issueId}`,
                {
                    status: value,
                },
                {
                    headers: {
                        Authorization: authData.accessToken,
                    },
                }
            )
            .then(() => {
                axios
                    .get(`/projects/${id}`, {
                        headers: {
                            Authorization: authData.accessToken,
                        },
                    })
                    .then((data) => data.data)
                    .then((res) => setProject(res.data))
                    .catch((e) => alert(e.message));
            })
            .catch((e) => alert(e.message));
    };

    const handleCreate = (data) => {
        setIsLoading(true);
        axios
            .post(
                `/issues`,
                {
                    title: data.title,
                    details: data.details,
                    label: data.label,
                    deadline: data.deadline,
                    project_id: id,
                },
                {
                    headers: {
                        Authorization: authData.accessToken,
                    },
                }
            )
            .then(() => {
                axios
                    .get(`/projects/${id}`, {
                        headers: {
                            Authorization: authData.accessToken,
                        },
                    })
                    .then((data) => data.data)
                    .then((res) => {
                        setProject(res.data);
                        setIsLoading(false);
                        handleClose();
                    })
                    .catch((e) => alert(e.message));
            })
            .catch((e) => alert(e.message));
    };

    return project ? (
        <Box sx={{ mt: 2 }}>
            <Typography variant={'h3'} component={'h3'}>
                {project.title}
            </Typography>
            <Typography variant={'body1'} component={'h6'}>
                {project.summary}
            </Typography>
            {project.repo_url && (
                <Typography variant={'body2'} component={'p'} color={blue[800]}>
                    Repository: {project.repo_url}
                </Typography>
            )}
            <Typography variant={'caption'} component={'p'} sx={{ mt: 1 }}>
                Project Created At: {project.created_at}
            </Typography>
            <Typography variant={'caption'} component={'p'}>
                Last Updated At: {project.updated_at}
            </Typography>
            <Button sx={{ mt: 2 }} onClick={handleClickOpen}>
                Create Issue
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(handleCreate)}>
                    <DialogTitle>Create an Issue</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new issue please fill up the following
                            form.
                        </DialogContentText>

                        <Controller
                            name={'title'}
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label={'Title'}
                                    type={'text'}
                                    error={
                                        errors.title ? errors.title.message : ''
                                    }
                                    required
                                    {...field}
                                    ref={null} // https://stackoverflow.com/a/68818397/11657172
                                />
                            )}
                        />
                        <Controller
                            name={'details'}
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    label={'Details'}
                                    type={'text'}
                                    error={
                                        errors.details
                                            ? errors.details.message
                                            : ''
                                    }
                                    required
                                    {...field}
                                    ref={null} // https://stackoverflow.com/a/68818397/11657172
                                />
                            )}
                        />
                        <Controller
                            name={'label'}
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth required>
                                    <InputLabel>Label</InputLabel>
                                    <Select
                                        defaultValue={'feature'}
                                        {...field}
                                        label="Label"
                                        required
                                    >
                                        <MenuItem value={'feature'}>
                                            Feature
                                        </MenuItem>
                                        <MenuItem value={'test'}>Test</MenuItem>
                                        <MenuItem value={'refactor'}>
                                            Refactor
                                        </MenuItem>
                                        <MenuItem value={'bug'}>Bug</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Controller
                            name={'deadline'}
                            control={control}
                            render={({ field }) => (
                                <>
                                    <InputLabel>Deadline</InputLabel>
                                    <InputField
                                        // label={'Deadline'}
                                        type={'date'}
                                        error={
                                            errors.deadline
                                                ? errors.deadline.message
                                                : ''
                                        }
                                        {...field}
                                        ref={null}
                                    />
                                </>
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Stack direction={'row'} gap={1}>
                            {isLoading ? (
                                <LoadingButton />
                            ) : (
                                <>
                                    <Button
                                        onClick={handleClose}
                                        variant="text"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">Create</Button>
                                </>
                            )}
                        </Stack>
                    </DialogActions>
                </form>
            </Dialog>
            <Divider sx={{ my: 1 }} />
            {project.issues.length > 0 && (
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                            color={orange[600]}
                        >
                            Todo
                        </Typography>
                        {project.issues.map(
                            (issue) =>
                                issue.status === 'todo' && (
                                    <Card key={issue.id}>
                                        <Box
                                            sx={{
                                                textAlign: 'right',
                                                textTransform: 'capitalize',
                                            }}
                                            color={
                                                issue.status === 'todo'
                                                    ? orange[600]
                                                    : issue.status === 'done'
                                                    ? green[800]
                                                    : blue[800]
                                            }
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    size={'small'}
                                                    sx={{ mb: 1, px: 2 }}
                                                    defaultValue={issue.status}
                                                    label={issue.status}
                                                    onChange={(e) =>
                                                        onChangeHandler(
                                                            e.target.value,
                                                            issue.id
                                                        )
                                                    }
                                                    name="status-input"
                                                >
                                                    <MenuItem
                                                        value={'todo'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Todo
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'in-process'}
                                                        selected={
                                                            issue.status ===
                                                            'in-process'
                                                        }
                                                    >
                                                        In-process
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'done'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Done
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ mt: 1 }}>
                                            <Typography
                                                variant={'h5'}
                                                component={'h5'}
                                            >
                                                {issue.title}
                                            </Typography>
                                            <Typography
                                                variant={'caption'}
                                                component={'p'}
                                                sx={{ mt: 1 }}
                                            >
                                                {issue.details}
                                            </Typography>
                                            <Chip
                                                label={issue.label}
                                                variant="outlined"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                            <Typography
                                                variant={'body1'}
                                                component={'p'}
                                                sx={{ mt: 2 }}
                                            >
                                                Branch:{' '}
                                                <b>{issue.branch_name}</b>
                                            </Typography>
                                            {issue.deadline && (
                                                <Typography
                                                    variant={'body1'}
                                                    component={'p'}
                                                >
                                                    Deadline:{' '}
                                                    <b>{issue.deadline}</b>
                                                </Typography>
                                            )}
                                        </Box>
                                    </Card>
                                )
                        )}
                    </Grid>
                    <Grid item md={4}>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                            color={blue[800]}
                        >
                            In-Process
                        </Typography>
                        {project.issues.map(
                            (issue) =>
                                issue.status === 'in-process' && (
                                    <Card key={issue.id}>
                                        <Box
                                            sx={{
                                                textAlign: 'right',
                                                textTransform: 'capitalize',
                                            }}
                                            color={
                                                issue.status === 'todo'
                                                    ? orange[600]
                                                    : issue.status === 'done'
                                                    ? green[800]
                                                    : blue[800]
                                            }
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    size={'small'}
                                                    sx={{ mb: 1, px: 2 }}
                                                    defaultValue={issue.status}
                                                    label={issue.status}
                                                    onChange={(e) =>
                                                        onChangeHandler(
                                                            e.target.value,
                                                            issue.id
                                                        )
                                                    }
                                                    name="status-input"
                                                >
                                                    <MenuItem
                                                        value={'todo'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Todo
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'in-process'}
                                                        selected={
                                                            issue.status ===
                                                            'in-process'
                                                        }
                                                    >
                                                        In-process
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'done'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Done
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ mt: 1 }}>
                                            <Typography
                                                variant={'h5'}
                                                component={'h5'}
                                            >
                                                {issue.title}
                                            </Typography>
                                            <Typography
                                                variant={'caption'}
                                                component={'p'}
                                                sx={{ mt: 1 }}
                                            >
                                                {issue.details}
                                            </Typography>
                                            <Chip
                                                label={issue.label}
                                                variant="outlined"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                            <Typography
                                                variant={'body1'}
                                                component={'p'}
                                                sx={{ mt: 2 }}
                                            >
                                                Branch:{' '}
                                                <b>{issue.branch_name}</b>
                                            </Typography>
                                            {issue.deadline && (
                                                <Typography
                                                    variant={'body1'}
                                                    component={'p'}
                                                >
                                                    Deadline:{' '}
                                                    <b>{issue.deadline}</b>
                                                </Typography>
                                            )}
                                        </Box>
                                    </Card>
                                )
                        )}
                    </Grid>
                    <Grid item md={4}>
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                            }}
                            color={green[800]}
                        >
                            Done
                        </Typography>
                        {project.issues.map(
                            (issue) =>
                                issue.status === 'done' && (
                                    <Card key={issue.id}>
                                        <Box
                                            sx={{
                                                textAlign: 'right',
                                                textTransform: 'capitalize',
                                            }}
                                            color={
                                                issue.status === 'todo'
                                                    ? orange[600]
                                                    : issue.status === 'done'
                                                    ? green[800]
                                                    : blue[800]
                                            }
                                        >
                                            <FormControl fullWidth>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    size={'small'}
                                                    sx={{ mb: 1, px: 2 }}
                                                    defaultValue={issue.status}
                                                    label={issue.status}
                                                    onChange={(e) =>
                                                        onChangeHandler(
                                                            e.target.value,
                                                            issue.id
                                                        )
                                                    }
                                                    name="status-input"
                                                >
                                                    <MenuItem
                                                        value={'todo'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Todo
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'in-process'}
                                                        selected={
                                                            issue.status ===
                                                            'in-process'
                                                        }
                                                    >
                                                        In-process
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'done'}
                                                        selected={
                                                            issue.status ===
                                                            'todo'
                                                        }
                                                    >
                                                        Done
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        <Divider />
                                        <Box sx={{ mt: 1 }}>
                                            <Typography
                                                variant={'h5'}
                                                component={'h5'}
                                            >
                                                {issue.title}
                                            </Typography>
                                            <Typography
                                                variant={'caption'}
                                                component={'p'}
                                                sx={{ mt: 1 }}
                                            >
                                                {issue.details}
                                            </Typography>
                                            <Chip
                                                label={issue.label}
                                                variant="outlined"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                            <Typography
                                                variant={'body1'}
                                                component={'p'}
                                                sx={{ mt: 2 }}
                                            >
                                                Branch:{' '}
                                                <b>{issue.branch_name}</b>
                                            </Typography>
                                            {issue.deadline && (
                                                <Typography
                                                    variant={'body1'}
                                                    component={'p'}
                                                >
                                                    Deadline:{' '}
                                                    <b>{issue.deadline}</b>
                                                </Typography>
                                            )}
                                        </Box>
                                    </Card>
                                )
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    ) : (
        <Typography
            variant={'h4'}
            component={'h4'}
            sx={{ fontWeight: 'bold', textAlign: 'center', mt: 2 }}
        >
            <CircularProgress />
        </Typography>
    );
};

export default Project;
