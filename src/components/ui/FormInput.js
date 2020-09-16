import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export default ({labelName, ...otherProps}) => (
  <TextInput
    label={labelName}
    style={styles.input}
    numberOfLines={1}
    {...otherProps}
  />
);

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 1.5,
  },
});
