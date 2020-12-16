import React, {useEffect, useState, useMemo} from 'react';
import ImageModal from 'react-native-image-modal';
import {FireBaseStorage} from '../../utils';
import {ActivityIndicator, StyleSheet} from 'react-native';

const DrawImage = React.memo(({currentMessage}) => {
  const [imageURI, setImageURI] = useState('');

  const imageRef = useMemo(
    () => FireBaseStorage.ref('/' + currentMessage.image),
    [currentMessage],
  );

  useEffect(() => {
    imageRef.getDownloadURL().then((data) => {
      setImageURI(data);
    });
  }, [imageRef]);

  if (!imageURI) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <ImageModal
      resizeMode="contain"
      imageBackgroundColor="#000000"
      style={styles.image}
      source={{
        uri: imageURI,
      }}
    />
  );
});

const styles = StyleSheet.create({
  loadingIndicator: {
    zIndex: 5000,
    color: 'red',
  },
  image: {
    width: 250,
    height: 250,
  },
});

export default DrawImage;
