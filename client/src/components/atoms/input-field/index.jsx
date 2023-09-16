import { FormControl, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const InputField = ({
    label,
    name,
    type = 'text',
    variant = 'outlined',
    size = 'small',
    error,
    mb = 2,
    ...rest
}) => {
    return (
        <FormControl fullWidth sx={{ mb: mb }}>
            <TextField
                variant={variant}
                label={label}
                type={type}
                size={size}
                error={!!error}
                {...rest}
            />
            <Typography variant={'caption'} color={'error'}>
                {error}
            </Typography>
        </FormControl>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    error: PropTypes.string,
    mb: PropTypes.number,
};

export default InputField;
