import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import database from '@react-native-firebase/database';
import {getUserData} from '../../store/selectors/auth';
import { createMessage, fetchChatMessages } from '../../store/actions/chat';

export default () => {
  const [messages, setMessages] = useState([]);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  // Step 2: add a helper method
  // const onSend = useCallback((newMessages = []) => {
  //   console.log(messages, 99999999);
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  //   dispatch(createMessage(messages);
  // }, []);

  
  const onSend = useCallback((newMessage) => {
    console.log(newMessage, 99999999);
    //setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    dispatch(createMessage(newMessage));
  }, []);

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  useEffect(() => {
    const onValueChange = database()
      .ref(`/messages`)
      .orderByChild('createdAt')
      .on('value', snapshot => {
        if (snapshot.val()) {
          setMessages(Object.values(snapshot.val()));
        }
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref(`/users`)
        .off('value', onValueChange);
  }, []);
  //console.log(messages, 6666666);
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => onSend(newMessage)}
      user={{ _id: userData.userId, name: userData.userId }}
      renderBubble={renderBubble}
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
    />
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});