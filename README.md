# Pokémon Memory Card Game

A memory game built with React. Click each Pokémon card once. Click the same one twice and the round is over. The cards shuffle after every click, so you have to remember which ones you've already picked.

Live demo:(https://memory-game-iszy.vercel.app/)

## How to play

1. Click a card to score a point.
2. The cards shuffle after every click.
3. Never click the same card twice in a round.
4. Click all 12 cards without a repeat to win.

Your best score is tracked across rounds, so you can try to beat it.

## Features

- Pokémon images and names fetched from [PokeAPI](https://pokeapi.co/)
- Cards shuffle on load and after every click
- Live score and best score
- Game over and win screens, with a play again button
- Collapsible "How to play" guide that hides after your first click
- Responsive grid that adjusts to any screen size
- Loading and error states for the API request

## Built with

- [React](https://react.dev/) (hooks: `useState`, `useEffect`)
- [Vite](https://vite.dev/)
- [PokeAPI](https://pokeapi.co/)
- Plain CSS (Grid and Flexbox)
- Deployed on [Vercel](https://vercel.com/)

## What I practiced

- Fetching data with `useEffect`, including a cleanup function to ignore stale responses
- Using `Promise.all` to fire multiple requests at once
- Lifting state up into `App` and passing it down as props
- Calculating values during render (`score`, `hasWon`) instead of storing them as extra state
- Keeping game logic inside the click handler instead of chaining Effects
- Conditional rendering for loading, error, win, and game over states

## Run it locally

```bash
git clone https://github.com/YOUR-USERNAME/memory-card.git
cd memory-card
npm install
npm run dev
```

Then open the local URL that Vite prints in your terminal.

## Project structure

```
src/
  components/
    Card.jsx
    CardGrid.jsx
    Scoreboard.jsx
  App.jsx
  index.css
```

## Credits

- Pokémon data and artwork from [PokeAPI](https://pokeapi.co/)
- Project idea from [The Odin Project](https://www.theodinproject.com/)
