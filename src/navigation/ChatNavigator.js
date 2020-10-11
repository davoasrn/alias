import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RoomScreen from '../screens/chat/RoomScreen';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import {IconButton} from 'react-native-paper';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#6646ee',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 22,
      },
    }}>
    <Stack.Screen
      name="Room"
      component={RoomScreen}
      options={({navigation}) => ({
        headerRight: () => (
          <IconButton
            icon="message-plus"
            size={28}
            color="#ffffff"
            onPress={() => navigation.navigate('ChatRoom')}
          />
        ),
      })}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
    />
  </Stack.Navigator>
);
