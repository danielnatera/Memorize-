import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import vocab_eng from "./translations/vocab_eng.json";
import vocab_spa from "./translations/vocab_spa.json";

const resources = {
  en: {
    vocab: vocab_eng,
  },
  es: {
    vocab: vocab_spa,
  },
};

i18n
  .use(initReactI18next) // Pasa el i18n a react-i18next.
  .init({
    resources,
    lng: localStorage.getItem("language") || "es",
    fallbackLng: "es",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
