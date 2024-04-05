import GameEdit from "@/app/(components)/games/GameEdit";
import GameView from "@/app/(components)/games/GameView";
import React from "react";

const BASE_URL = process.env.BASE_URL;

const getGames = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Games`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get games", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams`, {
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
    <div className="flex flex-col items-center">
      <h1>Game {params.id}</h1>
      <GameView teams={teams} game={game} />
    </div>
  );
};

export default GamePage;
