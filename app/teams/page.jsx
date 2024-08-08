import React from "react";
import TeamCard from "../(components)/teams/TeamCard";
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

const TeamsPage = async () => {
  const teams = await getTeams();
  const players = await getPlayers();

  return (
    <div className="flex flex-col items-center">
      <h1>Teams</h1>
      {teams.map((team) => (
        <TeamCard key={team.teamId} team={team} players={players} />
      ))}
    </div>
  );
};

export default TeamsPage;
