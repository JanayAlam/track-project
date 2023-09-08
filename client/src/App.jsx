import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/navbar';
import Register from './pages/auth/register';
import SignIn from './pages/auth/sign-in';
import Homepage from './pages/homepage';
import theme from './theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="xl">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </Container>
        </ThemeProvider>
    );
};

export default App;

