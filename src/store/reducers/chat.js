import {
  FETCH_CHAT_MESSAGES,
  CHAT_MESSAGE_CREATE,
  CHAT_UPDATE,
  CHAT_DELETE,
} from '../actions/chat';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_MESSAGES:
    case CHAT_MESSAGE_CREATE:
      return {
        messages: action.messages,
      };
    case CHAT_UPDATE:
      return {
        messages: action.messages,
      };
    case CHAT_DELETE:
      return {
        messages: [],
      };
  }
  return state;
};
