import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoomScreen from '../screens/chat/RoomScreen';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="ChatRoom" component={RoomScreen} />
  </Stack.Navigator>
);
