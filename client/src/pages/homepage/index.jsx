import { Box, Card, CardContent, Typography } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from '../../api/axios';
import Button from '../../components/atoms/button';

const Homepage = () => {
    const [allProjects, setAllProjects] = useState([]);

    const { data: authData } = useStoreState((states) => states.auth);

    useEffect(() => {
        document.title = `Track Project`;
        axios
            .get('/projects', {
                headers: {
                    Authorization: authData.accessToken,
                },
            })
            .then((data) => {
                return data.data;
            })
            .then((res) => setAllProjects(res.data))
            .catch((e) => alert(e.response ? e.response.error : e.message));
    }, []);

    return allProjects.length === 0 ? (
        <Box sx={{ textAlign: 'center', fontWeight: 'bold' }}>Empty</Box>
    ) : (
        allProjects.map((project) => (
            <Card variant="outlined" key={project.id}>
                <CardContent>
                    <Typography
                        variant="h5"
                        component={'h2'}
                        sx={{ fontWeight: 'bold' }}
                    >
                        {project.title}
                    </Typography>
                    <Typography variant="body1" component={'p'}>
                        {project.summary}
                    </Typography>
                    <Typography
                        variant="body2"
                        component={'p'}
                        color={project.is_running ? blue[800] : red[800]}
                    >
                        {project.is_running ? 'Running' : 'Finished Project'}
                    </Typography>
                    <Typography variant="caption" component={'p'}>
                        Project created at {project.created_at}
                    </Typography>
                    <Button
                        to={`/project/${project.id}`}
                        component={RouterLink}
                        sx={{ mt: 1 }}
                    >
                        Open Project
                    </Button>
                </CardContent>
            </Card>
        ))
    );
};

export default Homepage;

