import React from 'react';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {enableScreens} from 'react-native-screens';
import authReducer from './src/store/reducers/auth';
import chatReducer from './src/store/reducers/chat';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider as PaperProvider} from 'react-native-paper';

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </Provider>
  );
};

export default App;
