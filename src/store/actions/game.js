export const FETCH_USER_GAMES = 'FETCH_USER_GAMES';
export const GAME_NAME_CREATE = 'GAME_NAME_CREATE';
export const GAME_NAME_UPDATE = 'GAME_NAME_UPDATE';
export const GAME_NAME_DELETE = 'GAME_NAME_DELETE';

export const FETCH_GAME_WORDS = 'FETCH_GAME_WORDS';
export const GAME_WORD_ADD = 'GAME_WORD_ADD';
export const GAME_WORD_UPDATE = 'GAME_WORD_UPDATE';
export const GAME_WORD_DELETE = 'GAME_WORD_DELETE';

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