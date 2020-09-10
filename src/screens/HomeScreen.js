import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';
import {isAuthenticated} from '../store/selectors/auth';

const HomeScreen = ({navigation}) => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const {token, userId, expiryDate} = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      // props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Text>Home screen</Text>
      {isAuth ? (
        <>
          <Button
            title="Logout"
            color={Colors.primary}
            onPress={() => {
              dispatch(authActions.logout());
            }}
          />
          <Button
            title="Create Game"
            color={Colors.primary}
            onPress={() => {
              navigation.navigate('Game');
            }}
          />
        </>
      ) : (
        <Button
          title="login"
          onPress={() => {
            navigation.navigate('Auth');
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
