export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const CHAT_MESSAGE_CREATE = 'CHAT_MESSAGE_CREATE';
export const CHAT_UPDATE = 'CHAT_UPDATE';
export const CHAT_DELETE = 'CHAT_DELETE';
import database from '@react-native-firebase/database';

const url = 'https://alias-cb647.firebaseio.com/';

export const fetchChatMessages = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
          database()
          .ref('/messages')
          .then(snapshot => {
            console.log('User data: ', snapshot.val(), 777777777);
          });
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const resData = await response.json();
      
            dispatch({
              type: FETCH_CHAT_USERS,
              messages: resData,
            });
          } catch (err) {
            // send to custom analytics server
            throw err;
          }
    }
}

export const createMessage = (text) => {
  return async (dispatch) => {
    const [message] = text;
    message.createdAt = new Date().getTime(); 
    database().ref('/messages').push(message);
  }
}