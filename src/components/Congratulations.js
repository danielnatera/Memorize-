import React, { useEffect, useRef } from "react";
import ModyoIco from "../assets/svg/Modyo.js";
import "../i18n";
import { useTranslation } from "react-i18next";

function Congratulations({
  isGameCompleted,
  setIsGameCompleted,
  hits,
  misses,
  resetGame,
}) {
  const buttonRef = useRef(null);
  const { t } = useTranslation("vocab");
  useEffect(() => {
    if (isGameCompleted) {
      const timer = setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.classList.add("activate");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isGameCompleted]);

  return (
    <dialog open={isGameCompleted}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-light dark:bg-dark dark:text-light p-4 rounded-lg shadow-lg congratulationsModal flex flex-col items-center justify-center">
          <div className="light-button flex flex-col items-center fontMedium">
            <button ref={buttonRef} className="bt">
              <div className="light-holder">
                <div className="dot"></div>
                <div className="light"></div>
              </div>
              <div className="button-holder breakWord">
                <ModyoIco />
                <p>{localStorage.getItem("userName")}</p>
                <p className="pt-3">{t("congratulations")}</p>
              </div>
            </button>
            <p className="mt-9 mb-4 text-center">
              {t("congratulationsMessage")}
            </p>
            <p>
              {t("hits")}: {hits}
            </p>
            <p>
              {t("misses")}: {misses}
            </p>
          </div>
          <button
            className="mt-8 px-4 py-2 bg-primary text-light rounded"
            onClick={resetGame}
          >
            {t("newGame")}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Congratulations;
