import { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import Scoreboard from "./components/Scoreboard";

const CARD_COUNT = 12;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedIds, setClickedIds] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [hasLost, setHasLost] = useState(false);

  const score = clickedIds.length;
  const hasWon = cards.length > 0 && score === cards.length;

  useEffect(() => {
    let ignore = false;

    async function loadCards() {
      try {
        const requests = Array.from({ length: CARD_COUNT }, (_, i) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then((res) => {
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            return res.json();
          }),
        );

        const results = await Promise.all(requests);

        const data = results.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.other["official-artwork"].front_default,
        }));

        if (!ignore) setCards(shuffle(data));
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadCards();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      setClickedIds([]);
      setHasLost(true);
    } else {
      const nextClicked = [...clickedIds, id];
      setClickedIds(nextClicked);
      setBestScore(Math.max(bestScore, nextClicked.length));
      setHasLost(false);
    }
    setCards(shuffle(cards));
  }
  function handlePlayAgain() {
    setClickedIds([]);
    setCards(shuffle(cards));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <>
      <h2 className="heading">POKEMON MEMORY GAME</h2>
      <Scoreboard score={score} bestScore={bestScore} />
      {hasLost && <h2 className="lost">Game over! Let's run this again</h2>}
      {hasWon ? (
        <div className="win">
          <h2>You won! You clicked all {cards.length} without a repeat 🎉</h2>
          <button onClick={handlePlayAgain}>Play again</button>
        </div>
      ) : (
        <CardGrid cards={cards} onCardClick={handleCardClick} />
      )}
    </>
  );
}
