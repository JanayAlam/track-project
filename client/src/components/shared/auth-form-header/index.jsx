import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import logo from '../../../assets/logo.png';

const AuthFormHeader = ({ headerText, helpText }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <img src={logo} alt={'Logo'} height={75} width={75} />
            <Typography component={'h1'} sx={{ fontSize: '1.5rem' }}>
                {headerText}
            </Typography>
            {helpText && (
                <Typography component={'p'} variant={'caption'}>
                    {helpText}
                </Typography>
            )}
        </Box>
    );
};

AuthFormHeader.propTypes = {
    headerText: PropTypes.string.isRequired,
    helpText: PropTypes.string,
};

export default AuthFormHeader;
