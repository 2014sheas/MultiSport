"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const GameView = ({ teams, game }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const homeTeam = teams.find((team) => team.teamId === game.homeTeam);
  const awayTeam = teams.find((team) => team.teamId === game.awayTeam);
  const hasHomeTeam = homeTeam ? true : false;
  const hasAwayTeam = awayTeam ? true : false;
  const hasTeams = hasHomeTeam && hasAwayTeam;

  const onEdit = () => {
    router.push(`/games/editGame/${game.gameId}`);
  };

  const homeScoreSwitch = (status) => {
    switch (status) {
      case "In Progress":
        return <label>{game.homeScore}</label>;
      case "Completed":
        return <label>{game.homeScore}</label>;
      default:
        return <label>0</label>;
    }
  };

  const awayScoreSwitch = (status) => {
    switch (status) {
      case "In Progress":
        return <label>{game.awayScore}</label>;
      case "Completed":
        return <label>{game.awayScore}</label>;
      default:
        return <label>0</label>;
    }
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-lg py-4 bg-slate-900 w-5/6 md:w-3/5 max-w-[600px]">
      <h2> {game.status}</h2>
      <div className="flex flex-row  justify-between w-1/2">
        <div className="flex flex-col items-center w-1/2">
          <label className="text-center font-bold text-lg">
            {hasHomeTeam ? homeTeam.abbreviation : `${game.homeTeam})`}
          </label>
          {homeScoreSwitch(game.status)}
        </div>
        <div className="flex flex-col items-center w-1/2">
          <label className="text-center font-bold text-lg">
            {hasAwayTeam ? awayTeam.abbreviation : `(${game.awayTeam})`}
          </label>
          {awayScoreSwitch(game.status)}
        </div>
      </div>
      {isAdmin && (
        <button className="edit-btn w-1/2 mt-4" onClick={onEdit}>
          Edit Game
        </button>
      )}
    </div>
  );
};

export default GameView;
