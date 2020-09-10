import {
    FETCH_USER_GAMES,
    GAME_NAME_CREATE,
    GAME_NAME_UPDATE,
    GAME_NAME_DELETE,
} from '../actions/game';

const initialState = {
  userGames: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_GAMES:
      return {
        userGames: action.userGames,
      };
  }
  return state;
};
