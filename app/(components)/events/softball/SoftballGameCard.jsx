"use client";
import React from "react";
import Link from "next/link";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

function SoftballGameCard({ game, teams, event }) {
  console.log("in SoftballGameCard");
  console.log(game);
  console.log(teams);
  const team1split = game.awayTeam.split("-");
  const team2split = game.homeTeam.split("-");

  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

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

  const teamContent = (team) => {
    const team1 = teams.find((t) => t.teamId === team[0]);
    const team2 = teams.find((t) => t.teamId === team[1]);
    return (
      <div className="text-center overflow-hidden whitespace-nowrap overflow-ellipsis flex items-center">
        {`${team1.abbreviation} & ${team2.abbreviation}`}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-lg py-4 bg-slate-900 w-5/6 md:w-3/5 max-w-[600px]">
      <h2> {event.status}</h2>
      <div className="flex flex-row  justify-between w-1/2">
        <div className="flex flex-col items-center w-1/2">
          <label className="text-center font-bold text-lg">
            {teamContent(team1split)}
          </label>
          {homeScoreSwitch(game.status)}
        </div>
        <div className="flex flex-col items-center w-1/2">
          <label className="text-center font-bold text-lg">
            {teamContent(team2split)}
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
}

export default SoftballGameCard;
