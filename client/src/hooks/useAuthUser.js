import { useStoreState } from 'easy-peasy';

const useAuthUser = () => {
    const auth = useStoreState((state) => state.auth);
    return auth.data.user || null;
};

export default useAuthUser;
