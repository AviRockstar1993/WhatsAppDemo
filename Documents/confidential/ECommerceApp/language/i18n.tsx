// import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18next, {
//   InitOptions,
//   LanguageDetectorAsyncModule,
//   Services,
// } from 'i18next';
// import {initReactI18next} from 'react-i18next';
// import bengali from './ben.json';
// import hindi from './hi.json';
// import english from './en.json';

// const languageDetector: LanguageDetectorAsyncModule = {
//   type: 'languageDetector',
//   // If this is set to true, your detect function receives a callback function that you should call with your language,
//   //useful to retrieve your language stored in AsyncStorage for example
//   async: true,
//   init: (
//     _services: Services,
//     _detectorOptions: object,
//     _i18nextOptions: InitOptions,
//   ) => {
//     / use services and options /;
//   },
//   detect: (callback: (lng: string) => void) => {
//     AsyncStorage.getItem('APP_LANG', (err, lng) => {
//       //Handle error fetching stored data or no data found
//       if (err || !lng) {
//         console.log('GET', 'error');
//         callback('en');
//         return;
//       }
//       console.log('GET', lng);
//       callback(lng);
//     });
//   },
//   cacheUserLanguage: (lng: string) => {
//     console.log('SAVE', lng);
//     AsyncStorage.setItem('APP_LANG', lng);
//   },
// };
// i18next
//   .use(initReactI18next)
//   .use(languageDetector)
//   .init({
//     compatibilityJSON: 'v3',
//     resources: {
//       en: english,
//       hi: hindi,
//       ben: bengali,
//     },
//     fallbackLng: 'en',
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18next;

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import bengali from './ben.json';
import hindi from './hi.json';
import english from './en.json';

// const languageDetector: LanguageDetectorAsyncModule = {
//   type: 'languageDetector',
//   // If this is set to true, your detect function receives a callback function that you should call with your language,
//   //useful to retrieve your language stored in AsyncStorage for example
//   async: true,
//   init: (
//     _services: Services,
//     _detectorOptions: object,
//     _i18nextOptions: InitOptions,
//   ) => {
//     / use services and options /;
//   },
//   detect: (callback: (lng: string) => void) => {
//     AsyncStorage.getItem('APP_LANG', (err, lng) => {
//       //Handle error fetching stored data or no data found
//       if (err || !lng) {
//         console.log('GET', 'error');
//         callback('en');
//         return;
//       }
//       console.log('GET', lng);
//       callback(lng);
//     });
//   },
//   cacheUserLanguage: (lng: string) => {
//     console.log('SAVE', lng);
//     AsyncStorage.setItem('APP_LANG', lng);
//   },
// };

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: english,
    hi: hindi,
    ben: bengali,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
