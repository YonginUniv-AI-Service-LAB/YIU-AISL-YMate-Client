/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import {API_URL} from '@env'
API_URL = API_URL;
API_URL = "http://172.30.1.53:8080";
axios.defaults.withCredentials = true;
AppRegistry.registerComponent(appName, () => App);
