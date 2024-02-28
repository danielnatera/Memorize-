import React, { useState } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

function Welcome({ onSaveUsername }) {
  const [username, setUsername] = useState("");
  const { t } = useTranslation("vocab");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveUsername(username);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h4 className="text-center pb-8">{t("welcome")}</h4>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            {t("enterUsername")}
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pl-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-primary text-white rounded mt-8"
            >
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
