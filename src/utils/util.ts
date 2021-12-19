import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/min/locales';

const key = '@parladorideal:token';

async function getLocalToken() {
  return await AsyncStorage.getItem(key);
}

async function setLocalToken(token: string) {
  await AsyncStorage.setItem(key, token);
}

function formatDate(date: string) {
  return moment(date).locale('pt-br').format('LLL');
}

export { getLocalToken, setLocalToken, formatDate };
