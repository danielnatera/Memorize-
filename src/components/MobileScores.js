import React, { useEffect } from "react";
import "../i18n";
import { useTranslation } from "react-i18next";

function MobileScores({ hits, misses }) {
  const { t } = useTranslation("vocab");
  return (
    <div className="w-full mx-3 mt-10 text-center mb-5 mobileScoresContainer dark:text-light">
      <p class="mobileHits">
        {t("hits")}:{hits}
      </p>
      <p class="mobileMisses">
        {t("misses")}:{misses}
      </p>
    </div>
  );
}

export default MobileScores;
