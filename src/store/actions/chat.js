export const FETCH_CHAT_USERS = 'FETCH_CHAT_USERS';
export const CHAT_CREATE = 'CHAT_CREATE';
export const CHAT_UPDATE = 'CHAT_UPDATE';
export const CHAT_DELETE = 'CHAT_DELETE';

const url = 'https://alias-cb647.firebaseio.com/';

export const fetchUserGames = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
              `${url}/games/${userId}.json`
            );
      
            if (!response.ok) {
              throw new Error('Something went wrong!');
            }
      
            const resData = await response.json();
      
            dispatch({
              type: FETCH_USER_GAMES,
              userGames: resData,
            });
          } catch (err) {
            // send to custom analytics server
            throw err;
          }
    }
}