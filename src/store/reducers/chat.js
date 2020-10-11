import {
    FETCH_CHAT_MESSAGES,
    CHAT_MESSAGE_CREATE,
} from '../actions/chat';

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_MESSAGES:
    case CHAT_MESSAGE_CREATE:
      return {
        messages: action.messages,
      };
  }
  return state;
};
