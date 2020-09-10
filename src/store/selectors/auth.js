import {createSelector} from 'reselect';

const auth = (state) => state.auth;

export const isAuthenticated = createSelector(auth, (data) => !!data.token);
