import { createStore } from 'easy-peasy';
import authModel from './models/auth-model';

const store = createStore({
    auth: authModel,
});

export default store;
