import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';

export const FireBaseStorage = storage();

export const getFileLocalPath = (response) => {
  const {path, uri} = response;
  return Platform.OS === 'android' ? path : uri;
};

export const createStorageReferenceToFile = (response) => {
  const {fileName} = response;
  return FireBaseStorage.ref(fileName);
};

export const uploadFileToFireBase = (imagePickerResponse) => {
  const fileSource = getFileLocalPath(imagePickerResponse);
  const storageRef = createStorageReferenceToFile(imagePickerResponse);
  console.log(fileSource, 'here');
  return storageRef.putFile(fileSource);
};