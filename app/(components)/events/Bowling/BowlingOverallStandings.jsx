"use client";
import React, { useState } from "react";
import ShowUpload from "../../uploads/ShowUpload";

const BowlingOverallStandings = ({ players, teams }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bestScore");

  const showCarrot = (property) => {
    // if (orderBy === property) {
    //   return order === "asc" ? "▲" : "▼";
    // }
    return "";
  };

  const playersOnTeams = players.filter((player) => {
    return teams.some((team) => team.members.includes(player.playerId));
  });
  const playerScores = playersOnTeams.map((player) => {
    const playerTeam = teams.find((team) =>
      team.members.includes(player.playerId)
    );
    if (playerTeam === undefined) {
      return null;
    }
    const playerName = `${player.first_name} ${player.last_name[0]}`;
    let playerScore = player.bowlScore;
    if (playerScore === undefined || playerScore.length != 2) {
      playerScore = [0, 0];
    }
    return {
      playerName: playerName,
      playerId: player.playerId,
      teamId: playerTeam.teamId,
      teamName: playerTeam.abbreviation,
      teamLogo: playerTeam.logo,
      frame1: playerScore[0],
      frame2: playerScore[1],
      bestScore: Math.max(playerScore[0], playerScore[1]),
    };
  });

  playerScores.sort((a, b) => {
    return b.bestScore - a.bestScore;
  });

  const [playerScoresState, setPlayerScores] = useState(playerScores);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sortedScores = playerScoresState.sort((a, b) => {
      switch (property) {
        case "teamName":
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "playerName":
          const aName = [a.first_name, a.last_name];
          const bName = [b.first_name, b.last_name];
          if (aName[1] < bName[1]) {
            return -1;
          }
          if (aName[1] > bName[1]) {
            return 1;
          }
          if (aName[0] < bName[0]) {
            return -1;
          }
          if (aName[0] > bName[0]) {
            return 1;
          }
          return 0;
        default:
          return isAsc ? a[property] - b[property] : b[property] - a[property];
      }
    });

    setPlayerScores(sortedScores);
    console.log(playerScoresState);
  };

  const headRow = () => {
    return (
      <div className="flex flex-row w-full bg-slate-800 text-white py-2 justify-between">
        <div className="w-1/6" onClick={() => handleRequestSort("teamName")}>
          Team
          {showCarrot("teamName")}
        </div>
        <div className="w-1/6" onClick={() => handleRequestSort("playerName")}>
          Player
          {showCarrot("playerName")}
        </div>
        <div className="w-1/6" onClick={() => handleRequestSort("frame1")}>
          Frame 1{showCarrot("frame1")}
        </div>
        <div className="w-1/6" onClick={() => handleRequestSort("frame2")}>
          Frame 2{showCarrot("frame2")}
        </div>
        <div className="w-1/6" onClick={() => handleRequestSort("bestScore")}>
          Best
          {showCarrot("bestScore")}
        </div>
      </div>
    );
  };

  const rowColor = (index) => {
    return index % 2 === 0 ? "bg-slate-700" : "bg-slate-800";
  };

  const playerRow = (player, index) => {
    return (
      <div
        key={player.playerId}
        className={`flex flex-row w-full text-white py-2 ${rowColor(
          index
        )} justify-between`}
      >
        <div className="w-1/6 flex flex-row items-center">
          {player.teamLogo && (
            <ShowUpload
              imageurl={player.teamLogo}
              altText={player.teamName}
              size={20}
            />
          )}
          {player.teamName}
        </div>
        <div className="w-1/4">{player.playerName}</div>
        <div className="w-1/6">{player.frame1}</div>
        <div className="w-1/6">{player.frame2}</div>
        <div className="w-1/6">{player.bestScore}</div>
      </div>
    );
  };
  console.log(playerScoresState);
  return (
    <div className="flex flex-col w-full">
      {headRow()}
      {playerScores.map((player, index) => playerRow(player, index))}
    </div>
  );
};

export default BowlingOverallStandings;
