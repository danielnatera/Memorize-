import React, { useEffect } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

function Scoreboard({ hits, misses, time, setTime, isRunning }) {
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const existingGameData = JSON.parse(localStorage.getItem("gameData")) || [];
  const { t } = useTranslation("vocab");
  return (
    <div className="max-w-md mx-3 mt-10">
      <div className="text-center mb-5">
        <span className="text-lg font-semibold">
          <p className="stopwatch-time fontSeparate">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </span>
      </div>
      <table className="min-w-full leading-normal fontSubtitle mr-12">
        <tbody>
          <tr>
            <td className="px-5 py-5 border-b">{t("hits")}</td>
            <td className="px-5 py-5 border-b">{hits}</td>
          </tr>
          <tr>
            <td className="px-5 py-5">{t("misses")}</td>
            <td className="px-5 py-5">{misses}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="w-100 text-center fontSubtitle mt-8 my-4">
        {t("scoreboard")}
      </h3>
      <div className="table-container">
        <table className="w-full">
          <thead className="fontSmall">
            <tr>
              <th className="px-5 py-3">{t("user")}</th>
              <th className="px-2 py-3">{t("hits")}</th>
              <th className="px-5 py-3">{t("misses")}</th>
              <th className="px-5 py-3">{t("time")}</th>
            </tr>
          </thead>
          <tbody>
            {existingGameData.map((game, index) => (
              <tr key={index} className="text-center fontSmall">
                <td className="px-3 py-3 border-b border-gray-200 bg-white dark:bg-dark2">
                  {game.username}
                </td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white dark:bg-dark2">
                  {game.hits}
                </td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white dark:bg-dark2">
                  {game.misses}
                </td>
                <td className="px-3 py-3 border-b border-gray-200 bg-white dark:bg-dark2">
                  {Math.floor((game.timer % 360000) / 6000)
                    .toString()
                    .padStart(2, "0")}{" "}
                  :
                  {Math.floor((game.timer % 6000) / 100)
                    .toString()
                    .padStart(2, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scoreboard;
