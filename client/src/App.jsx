import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/navbar';
import Layout from './layout';
import OnlyUnauthorized from './layout/OnlyUnauthorized';
import RequireAuth from './layout/RequireAuth';
import AdminDashboard from './pages/admin-dashboard';
import Register from './pages/auth/register';
import SignIn from './pages/auth/sign-in';
import CreateProfile from './pages/create-profile';
import CreateProject from './pages/create-project';
import Unauthorized from './pages/errors/Unauthorized';
import Homepage from './pages/homepage';
import Project from './pages/project';
import store from './store';
import theme from './theme';

const App = () => {
    return (
        <BrowserRouter>
            <StoreProvider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <main className="App">
                        <Navbar />
                        <Container maxWidth={'xl'}>
                            <Routes>
                                <Route path={'/'} element={<Layout />}>
                                    {/* public routes */}
                                    <Route
                                        path={'/unauthorized'}
                                        element={<Unauthorized />}
                                    />
                                    <Route
                                        path={'/create-profile'}
                                        element={<CreateProfile />}
                                    />

                                    <Route element={<OnlyUnauthorized />}>
                                        <Route
                                            path={'register'}
                                            element={<Register />}
                                        />
                                        <Route
                                            path={'signin'}
                                            element={<SignIn />}
                                        />
                                    </Route>

                                    {/* private routes */}
                                    <Route element={<RequireAuth />}>
                                        <Route
                                            path={'/'}
                                            element={<Homepage />}
                                        />
                                        <Route
                                            path={'/project/:id'}
                                            element={<Project />}
                                        />
                                        <Route
                                            path={'/create-project'}
                                            element={<CreateProject />}
                                        />
                                    </Route>

                                    {/* admin routes */}
                                    <Route
                                        element={
                                            <RequireAuth isAdminRequired />
                                        }
                                    >
                                        <Route
                                            path={'/admin/dashboard'}
                                            element={<AdminDashboard />}
                                        />
                                    </Route>

                                    {/* catch all routes */}
                                    <Route
                                        path={'*'}
                                        element={<div>Missing</div>}
                                    />
                                </Route>
                            </Routes>
                        </Container>
                    </main>
                </ThemeProvider>
            </StoreProvider>
        </BrowserRouter>
    );
};

export default App;

