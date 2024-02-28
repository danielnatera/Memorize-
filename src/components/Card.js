import React, { useEffect } from "react";

function Card({
  card,
  handleFlip,
  tempState,
  handleCleanUp,
  currentDifficulty,
}) {
  let cardClass = "normal-class";
  if (tempState === "matched") {
    cardClass = "match";
  } else if (tempState === "unmatched") {
    cardClass = "unmatched";
  }
  const handleClick = () => {
    handleFlip(card.meta.name, card.id);
  };

  const sizeClass = (() => {
    switch (currentDifficulty) {
      case "hard":
        return "smallCard";
      case "medium":
        return "mediumCard";
      case "easy":
        return "largeCard";
      default:
        return "smallCard";
    }
  })();

  useEffect(() => {
    if (tempState === "matched" || tempState === "unmatched") {
      const timed = setTimeout(() => {
        // Triggering the cleanUp of the card
        handleCleanUp(card.id);
      }, 800);
      return () => clearTimeout(timed);
    }
  }, [tempState]);
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""}
      ${cardClass} flex justify-center items-center w-full ${sizeClass}`}
      onClick={handleClick}
    >
      {card.isFlipped && (
        <img
          src={card.fields.image.url}
          alt="Animal"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export default Card;
