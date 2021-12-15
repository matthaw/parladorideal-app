import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
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
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  return moment(date).locale(locale).format('LLL');
}

export { getLocalToken, setLocalToken, formatDate };
