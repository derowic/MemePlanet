// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hello: 'Hello',
        adminOnly: 'This is visible only to admin',
        // Dodaj inne tłumaczenia
      },
    },
    pl: {
      translation: {
        hello: 'Cześć',
        adminOnly: 'To jest widoczne tylko dla admina',
        // Dodaj inne tłumaczenia
      },
    },
  },
  lng: 'en', // Język domyślny
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
