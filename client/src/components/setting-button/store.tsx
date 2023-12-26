import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './reducer';

const store = configureStore({
    reducer: languageReducer
});

export default store;
