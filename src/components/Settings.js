import React, { useState, useEffect } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

function Settings({
  username,
  saveUsername,
  openSettings,
  setOpenSettings,
  setCurrentDifficulty,
  currentDifficulty,
  resetGame,
}) {
  const { t } = useTranslation("vocab");
  useEffect(() => {
    if (openSettings) {
      saveUsername(localStorage.getItem("userName") || "");
    }
  }, [openSettings, currentDifficulty]);

  useEffect(() => {
    resetGame();
  }, [currentDifficulty, resetGame]);

  const handleUsernameChange = (e) => {
    if (e.target.value) {
      saveUsername(e.target.value);
    }
  };

  const handleConfirm = () => {
    localStorage.setItem("userName", username);
    setOpenSettings(false); // Closing settings modal
  };

  const handleDifficultyChange = (newDifficulty) => {
    if (currentDifficulty !== newDifficulty) {
      setCurrentDifficulty(newDifficulty);
      localStorage.setItem("difficulty", newDifficulty); // Storing difficulty on localStorage
      resetGame(); // Restart the game with chosen difficulty
    }
  };

  if (!openSettings) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-dark p-4 rounded-lg shadow-lg modalContainer">
        <h2 className="text-lg font-bold mb-4 dark:text-light">
          {t("configuration")}
        </h2>
        <div>
          <label htmlFor="username" className="block mb-2 dark:text-light">
            {t("newUsername")}
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleConfirm}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {t("confirm")}
          </button>
        </div>
        <div className="mt-4 difficultyContainer">
          <h3 className="font-bold mb-2 dark:text-light">{t("difficulty")}:</h3>
          <button
            onClick={() => handleDifficultyChange("easy")}
            className={`py-2 px-4 rounded ${
              currentDifficulty === "easy"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            {t("easy")}
          </button>
          <button
            onClick={() => handleDifficultyChange("medium")}
            className={`py-2 px-4 rounded mx-2 ${
              currentDifficulty === "medium"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            {t("medium")}
          </button>
          <button
            onClick={() => handleDifficultyChange("hard")}
            className={`py-2 px-4 rounded ${
              currentDifficulty === "hard"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            {t("hard")}
          </button>
        </div>
        <button
          onClick={() => setOpenSettings(false)}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}

export default Settings;
