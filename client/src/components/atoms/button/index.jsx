import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';

const Button = ({
    variant = 'contained',
    type = 'button',
    size = 'small',
    color = 'primary',
    sx = {},
    children,
    ...rest
}) => {
    return (
        <MuiButton
            variant={variant}
            size={size}
            sx={{ px: 3, ...sx }}
            type={type}
            color={color}
            {...rest}
        >
            {children}
        </MuiButton>
    );
};

Button.propTypes = {
    variant: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    sx: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export default Button;
