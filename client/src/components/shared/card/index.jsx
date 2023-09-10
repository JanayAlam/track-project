import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import indigo from '@mui/material/colors/indigo';
import styles from './card.module.css';

const Card = ({ children }) => {
    return (
        <MuiCard
            variant="outlined"
            className={styles.cardComponent}
            sx={{ border: `1px solid ${indigo[50]}` }}
        >
            <MuiCardContent className={styles.cardContentComponent}>
                {children}
            </MuiCardContent>
        </MuiCard>
    );
};

export default Card;

