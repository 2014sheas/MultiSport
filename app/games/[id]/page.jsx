import GameEdit from "@/app/(components)/games/GameEdit";
import React from "react";

const getGames = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Games`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get games", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const GamePage = async ({ params }) => {
  let games = await getGames();
  let teams = await getTeams();
  let game = games.find((game) => game.gameId == params.id);
  return (
    <div>
      <h1>Game {params.id}</h1>
      <GameEdit allGames={games} teams={teams} game={game} />
    </div>
  );
};

export default GamePage;
