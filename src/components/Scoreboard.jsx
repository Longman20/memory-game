export default function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <p>Best: {bestScore}</p>
    </div>
  );
}
