import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GiftedChat, Bubble, Send, Actions} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {View, StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {getUserData} from '../../store/selectors/auth';
import {getChatMessages} from '../../store/selectors/chat';
import {createMessage, addMessage} from '../../store/actions/chat';
import ImagePicker from 'react-native-image-picker';
import {uploadFileToFireBase} from '../../utils';

export default () => {
  const messages = useSelector(getChatMessages);
  const userData = useSelector(getUserData);
  const [imageURI, setImageURI] = useState(null);
  const dispatch = useDispatch();

  const onSend = useCallback(
    (newMessage) => {
      dispatch(createMessage(newMessage));
    },
    [dispatch],
  );

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    );
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderActions(props) {
    return (
      <Actions
        {...props}
        options={{
          'Send Image': () =>
            ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (res) => {
                console.log(res, 'ressss');
                if (res.didCancel) {
                  alert('Post canceled');
                } else if (res.error) {
                  alert('An error occurred: ', res.error);
                } else {
                  setImageURI({uri: res.uri});
                  uploadFileToFireBase(res);
                }
              },
            ),
        }}
        icon={() => <IconButton icon="camera" size={12} color="#6646ee" />}
        onSend={(args) => console.log(args, 'kukus')}
      />
    );
  }

  useEffect(() => {
    const onValueChange = database()
      .ref('/messages')
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          dispatch(addMessage(Object.values(snapshot.val())));
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref('/messages').off('value', onValueChange);
  }, [dispatch]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => onSend(newMessage)}
      user={{_id: userData.userId, name: userData.userId}}
      renderBubble={renderBubble}
      onPressAvatar={() => console.log('hello')}
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      renderActions={renderActions}
    />
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
