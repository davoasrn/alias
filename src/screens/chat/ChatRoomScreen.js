import React, {useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GiftedChat, Bubble, Send, Actions} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  LogBox,
  Keyboard,
} from 'react-native';
import {IconButton} from 'react-native-paper';
import {getUserData} from '../../store/selectors/auth';
import {getChatMessages} from '../../store/selectors/chat';
import {createMessage, addMessage} from '../../store/actions/chat';
import ImagePicker from 'react-native-image-picker';
import {uploadFileToFireBase} from '../../utils';
import DrawImage from '../../components/ui/DrawImage';

export default () => {
  const messages = useSelector(getChatMessages);
  const userData = useSelector(getUserData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);

  const onSend = useCallback(
    (newMessage) => {
      dispatch(createMessage(newMessage));
    },
    [dispatch],
  );

  const renderSend = useCallback(
    (props) => (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    ),
    [],
  );

  const renderBubble = useCallback(
    (props) => (
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
    ),
    [],
  );

  const renderActions = useCallback(
    (props) => (
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
              async (res) => {
                if (res.didCancel) {
                  alert('Post canceled');
                } else if (res.error) {
                  alert('An error occurred: ', res.error);
                } else {
                  //setImageURI({uri: res.uri});
                  setIsLoading(true);
                  const uploadData = await uploadFileToFireBase(res);
                  props.onSend([
                    {
                      image: uploadData.metadata.name,
                      //user: {_id: userData.id, name: userData.name},
                    },
                  ]);
                  setIsLoading(false);
                }
              },
            ),
        }}
        icon={() => <IconButton icon="camera" size={12} color="#6646ee" />}
      />
    ),
    [],
  );

  const renderMessageImage = useCallback(
    (props) => <DrawImage currentMessage={props.currentMessage} />,
    [],
  );

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
    <>
      {isLoading && (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      )}
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => onSend(newMessage)}
        user={{_id: userData.userId, name: userData.userId}}
        renderBubble={renderBubble}
        onPressAvatar={() => console.log('press avatar')}
        showUserAvatar
        alwaysShowSend
        renderSend={renderSend}
        renderActions={renderActions}
        renderMessageImage={renderMessageImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    zIndex: 5,
    width: '100%',
    height: '100%',
  },
});
