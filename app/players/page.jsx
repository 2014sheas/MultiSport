import React from "react";

const BASE_URL = process.env.BASE_URL;

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

const getPlayers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};
const PlayerPage = async () => {
  const players = await getPlayers();
  console.log(players);
  return (
    <div>
      {players.map((player) => (
        <div key={player.id}>
          <h1>{player.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default PlayerPage;
