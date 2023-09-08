import { Card as MuiCard, CardContent as MuiCardContent } from '@mui/material';
import indigo from '@mui/material/colors/indigo';
import styles from './card.module.css';

const Card = ({ children }) => {
    return (
        <MuiCard
            variant="outlined"
            className={styles.cardComponent}
            style={{ border: `1px solid ${indigo[50]}` }}
        >
            <MuiCardContent className={styles.cardContentComponent}>
                {children}
            </MuiCardContent>
        </MuiCard>
    );
};

export default Card;
