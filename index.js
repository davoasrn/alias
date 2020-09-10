/**
 * @format
 * @todo https://react-native-community.github.io/async-storage/docs/link/ 
 * do linking for ios
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
