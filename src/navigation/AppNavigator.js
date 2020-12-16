import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/user/AuthScreen';
import {isAuthenticated} from '../store/selectors/auth';
import ChatNavigator from './ChatNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isAuth = useSelector(isAuthenticated);
  //   const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {!isAuth ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      ) : (
        <ChatNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
