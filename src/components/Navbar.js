import React, { useState, useEffect } from "react";
import appLogo from "../assets/Memorize.png";
import GearIco from "../assets/svg/GearIco";
import "../i18n";
import { useTranslation } from "react-i18next";

function Navbar({ setOpenSettings }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const { t, i18n } = useTranslation("vocab");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem("language") || "es";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    i18n.changeLanguage(selectedLanguage);
  }, [darkMode, selectedLanguage, i18n]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // Dark mode trigger
  useEffect(() => {
    const body = document.body;
    const toggle = document.querySelector(".toggle-inner");
    if (darkMode === true) {
      body.classList.add("dark-mode");
      toggle.classList.add("toggle-active");
    } else {
      body.classList.remove("dark-mode");
      toggle.classList.remove("toggle-active");
    }
  }, [darkMode]);

  return (
    <nav className="bg-secondary text-white p-4 w-full">
      <div className="container ml-14 flex justify-between items-center min-w-full">
        <div class="flex items-center">
          <img src={appLogo} alt="AppLogo" className="appLogo mr-3" />
          <a href="/" className="text-xl  fontSeparate">
            MEMORIZE!
          </a>
        </div>
        <div class="flex items-center toolsContainer">
          <div class="flex flex-col items-center mr-20">
            <h6 class="fontSeparate">{t("mode")}</h6>
            <div id="toggle" onClick={() => setDarkMode(!darkMode)}>
              <div className="toggle-inner" />
            </div>
          </div>
          <div class="flex flex-col items-center mr-20">
            <select
              onChange={handleLanguageChange}
              value={selectedLanguage}
              className="bg-transparent border border-light bg-light text-dark p-2 rounded"
            >
              <option value="es">{t("spanish")}</option>
              <option value="en">{t("english")}</option>
            </select>
          </div>
          <button
            class="mr-20 settingContainer"
            onClick={() => setOpenSettings(true)}
          >
            <GearIco />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
