import GameEdit from "@/app/(components)/games/GameEdit";
import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

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
  const allowedRoles = ["admin", "commish", "scorekeeper"];
  const session = await getSession();
  const user = session?.user;
  const userRoles = user?.["https://multisport.games/roles"];
  const canEdit = userRoles.some((role) => allowedRoles.includes(role));

  let games = await getGames();
  let teams = await getTeams();
  let game = games.find((game) => game.gameId == params.id);

  const editSwitch = () => {
    if (canEdit) {
      return <GameEdit allGames={games} teams={teams} game={game} />;
    } else {
      return (
        <div>
          <h2>Not Authorized</h2>;
          <p>You are not authorized to edit this game.</p>
          <p>Only Admins, Commissioners, and Scorekeepers can edit games.</p>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h1>Game {params.id}</h1>
      {editSwitch()}
    </div>
  );
};

export default withPageAuthRequired(GamePage, {
  returnTo: "/",
});
