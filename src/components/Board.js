import Card from "./Card";

function Board({ cards, handleFlip, handleCleanUp, currentDifficulty }) {
  //Managing the number of columns according to difficulty
  const gridClass = (() => {
    switch (currentDifficulty) {
      case "hard":
        return "grid-cols-8";
      case "medium":
        return "grid-cols-6";
      case "easy":
        return "grid-cols-4";
      default:
        return "grid-cols-8";
    }
  })();
  return (
    <div className="board flex flex-col items-center h-full mx-8 mt-8 overflow-auto">
      <section className={`grid ${gridClass} gap-4 w-full item square`}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            handleFlip={handleFlip}
            tempState={card.tempState}
            handleCleanUp={handleCleanUp}
            currentDifficulty={currentDifficulty}
          />
        ))}
      </section>
    </div>
  );
}

export default Board;
