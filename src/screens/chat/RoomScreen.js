import React from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import FormButton from '../../components/ui/FormButton';
import * as authActions from '../../store/actions/auth';

export default () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Title>Rooms</Title>
      <FormButton
        modeValue="contained"
        title="Logout"
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
