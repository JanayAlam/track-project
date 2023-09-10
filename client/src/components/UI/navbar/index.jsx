import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import indigo from '@mui/material/colors/indigo';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import useAuth from '../../../hooks/useAuth';
import styles from './navbar.module.css';

const Navbar = () => {
    const { pathname } = useLocation();
    const { isAuthenticated, logout: logoutUser } = useAuth();

    const logoutHandler = async () => {
        const error = await logoutUser();
        if (error) return alert(error);
    };

    return (
        <AppBar
            position="sticky"
            color="inherit"
            sx={{
                boxShadow: 0,
                borderBottom: `1px solid ${indigo[50]}`,
                marginBottom: 1,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar variant="dense" className={styles.toolbarStyle}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexGrow: 1,
                        }}
                    >
                        <Link
                            component={RouterLink}
                            to={'/'}
                            underline="none"
                            color={indigo[700]}
                        >
                            <Stack direction={'row'} gap={1}>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    height={35}
                                    width={35}
                                />
                                <Typography component="div" variant="h6">
                                    Track Project
                                </Typography>
                            </Stack>
                        </Link>
                    </Box>
                    <Stack direction={'row'} gap={1}>
                        {isAuthenticated ? (
                            <div onClick={logoutHandler}>Logout</div>
                        ) : (
                            <>
                                <Button
                                    to={'/signin'}
                                    component={RouterLink}
                                    variant={
                                        pathname === '/signin'
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    size="small"
                                    color="primary"
                                    className={styles.authButton}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    to={'/register'}
                                    component={RouterLink}
                                    variant={
                                        pathname === '/register'
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    size="small"
                                    color="primary"
                                    className={styles.authButton}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;

