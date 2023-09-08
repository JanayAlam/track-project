import { useEffect } from 'react';

const Homepage = () => {
    useEffect(() => {
        document.title = `Track Project`;
    }, []);

    return <div>Homepage</div>;
};

export default Homepage;
