import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Welcome from "./components/Welcome";
import Scoreboard from "./components/Scoreboard";
import Congratulations from "./components/Congratulations";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import MobileScores from "./components/MobileScores";
import "./index.css";

function App() {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [isBoardLocked, setIsBoardLocked] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("userName") || ""
  );
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timer, setTimer] = useState(0); // Tiempo transcurrido en segundos
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState("medium");

  useEffect(() => {
    fetchAndPrepareCards();
  }, []);

  useEffect(() => {
    if (hits === cards.length / 2 && hits > 0) {
      setIsRunning(false);
      setIsGameCompleted(true);
      const existingGameData =
        JSON.parse(localStorage.getItem("gameData")) || [];

      if (existingGameData.length >= 10) {
        existingGameData.shift();
      }

      const newGameEntry = { username, hits, misses, timer };
      existingGameData.push(newGameEntry);
      localStorage.setItem("gameData", JSON.stringify(existingGameData));
    }
  }, [hits]);

  const saveUsername = (name) => {
    localStorage.setItem("userName", name);
    setUsername(name);
  };

  const handleFlip = (cardName, cardId) => {
    if (!isRunning) setIsRunning(true);
    if (isBoardLocked || cardId === activeCard?.id) return;
    const newCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, isFlipped: true, tempState: "flipping" }; // Agregar un estado temporal
      }
      return card;
    });
    const selectedCard = newCards.find((card) => card.id === cardId);
    if (!selectedCard.isMatched) {
      toggleFlipCardById(cardId);
      if (activeCard === null) {
        // Si no hay una carta activa, la seleccionada se convierte en la activa
        setActiveCard(selectedCard);
      } else if (selectedCard.id !== activeCard.id) {
        // Comprobar si la carta seleccionada coincide con la activa
        if (selectedCard.meta.name === activeCard.meta.name) {
          setIsBoardLocked(true);
          // Si coinciden, marcar ambas cartas como coincididas
          const matchedCards = newCards.map((card) => {
            if (card.meta.name === selectedCard.meta.name) {
              return { ...card, isMatched: true, tempState: "matched" };
            }
            return card;
          });
          setHits((hits) => hits + 1);
          setCards(matchedCards);
          setActiveCard(null); // Resetea la carta activa para el siguiente turno
        } else {
          // Si no coinciden, volver a voltear ambas cartas después de un breve retraso
          setIsBoardLocked(true); // Bloquear el tablero mientras las cartas están siendo mostradas
          setMisses((misses) => misses + 1);
          setTimeout(() => {
            const resetCards = newCards.map((card) => {
              if (card.id === selectedCard.id || card.id === activeCard.id) {
                return { ...card, isFlipped: false, tempState: "unmatched" };
              }
              return card;
            });
            setCards(resetCards);
            setActiveCard(null); // Resetea la carta activa para el siguiente turno
          }, 1000);
        }
      } else {
        setIsBoardLocked(true);
        setTimeout(() => {
          const resetCards = newCards.map((card) => {
            if (card.id === selectedCard.id || card.id === activeCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setCards(resetCards);
          setActiveCard(null); // Resetea la carta activa para el siguiente turno
          setIsBoardLocked(false);
        }, 100);
      }
    }
  };

  const handleCleanUp = (cardId) => {
    setCards((currentCards) =>
      currentCards.map((card) => {
        if (card.id === cardId) {
          return { ...card, tempState: null }; // Limpiar el estado temporal
        }
        setIsBoardLocked(false); // Desbloquear el tablero después animación
        return card;
      })
    );
  };

  function prepareCards(cards) {
    let duplicatedCards = cards.concat(cards).map((card, index) => ({
      ...card,
      id: index,
      isFlipped: false,
      isMatched: false,
    }));

    for (let i = duplicatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [duplicatedCards[i], duplicatedCards[j]] = [
        duplicatedCards[j],
        duplicatedCards[i],
      ];
    }

    return duplicatedCards;
  }

  const fetchAndPrepareCards = async () => {
    try {
      let perPage;
      if (currentDifficulty === "easy") perPage = 6;
      else if (currentDifficulty === "medium") perPage = 12;
      else perPage = 20;
      const response = await fetch(
        `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${perPage}`
      );
      const data = await response.json();
      const preparedCards = prepareCards(data.entries);
      setCards(preparedCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  function toggleFlipCardById(cardId) {
    setCards((currentCards) =>
      currentCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  }

  function resetGame() {
    setIsBoardLocked(false);
    setIsGameCompleted(false);
    setMisses(0);
    setHits(0);
    setTimer(0);
    setIsRunning(false);
    fetchAndPrepareCards();
  }

  return (
    <div className="mainContainer flex flex-col h-screen w-screen">
      <Navbar setOpenSettings={setOpenSettings} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 bg_light dark:bg-dark2">
          {!username && <Welcome onSaveUsername={saveUsername} />}
          <MobileScores hits={hits} misses={misses} />
          <Board
            cards={cards}
            handleFlip={handleFlip}
            handleCleanUp={handleCleanUp}
            currentDifficulty={currentDifficulty}
          />
          {isGameCompleted && (
            <Congratulations
              isGameCompleted={isGameCompleted}
              setIsGameCompleted={setIsGameCompleted}
              hits={hits}
              misses={misses}
              resetGame={resetGame}
            />
          )}
          {openSettings && (
            <Settings
              username={username}
              saveUsername={saveUsername}
              openSettings={openSettings}
              setOpenSettings={setOpenSettings}
              setCurrentDifficulty={setCurrentDifficulty}
              currentDifficulty={currentDifficulty}
              resetGame={resetGame}
            />
          )}
        </main>
        <aside className="w-full md:w-1/4 bg-gray-100 dark:bg-dark dark:border-dark border-l dark:text-light overflow-auto">
          <Scoreboard
            hits={hits}
            misses={misses}
            time={timer}
            setTime={setTimer}
            isRunning={isRunning}
          />
        </aside>
      </div>
    </div>
  );
}

export default App;
