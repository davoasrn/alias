import {createSelector} from 'reselect';

const chat = (state) => state.chat;

export const getChatMessages = createSelector(chat, (data) => data.messages);
