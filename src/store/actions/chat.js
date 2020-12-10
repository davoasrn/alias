export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const CHAT_MESSAGE_CREATE = 'CHAT_MESSAGE_CREATE';
export const CHAT_UPDATE = 'CHAT_UPDATE';
export const CHAT_DELETE = 'CHAT_DELETE';
import database from '@react-native-firebase/database';

export const addMessage = (messages) => {
  return (dispatch) => {
    dispatch({type: CHAT_UPDATE, messages});
  };
};

export const createMessage = (text) => {
  return async (dispatch) => {
    const [message] = text;
    message.createdAt = new Date().getTime();
    database().ref('/messages').push(message);
  };
};
