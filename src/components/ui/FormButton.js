import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {Button} from 'react-native-paper';

const {width, height} = Dimensions.get('screen');

export default ({title, modeValue, ...otherProps}) => {
  return (
    <Button
      mode={modeValue}
      {...otherProps}
      style={styles.button}
      contentStyle={styles.buttonContainer}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    width: width / 2,
    height: height / 15,
  },
});
