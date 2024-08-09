import React, { useState } from "react";
import ShowUpload from "../../uploads/ShowUpload";
import Link from "next/link";

const BowlingTeamStandings = ({ teams, players }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bestScore");

  const teamScores = teams.map((team) => {
    const playersOnTeam = players.filter((player) =>
      team.members.includes(player.playerId)
    );
    if (playersOnTeam.length === 0) {
      return {
        teamId: team.teamId,
        teamName: team.abbreviation,
        teamLogo: team.logo,
        frame1: 0,
        frame2: 0,
        bestScore: 0,
      };
    }
    const playerScores = playersOnTeam.map((player) => {
      if (player.bowlScore === undefined || player.bowlScore.length != 2) {
        return [0, 0];
      }
      //make sure all scores are numeric
      player.bowlScore = player.bowlScore.map((score) => {
        return isNaN(score) ? 0 : score;
      });
      return player.bowlScore;
    });

    const teamFrame1Score = playerScores.reduce((acc, score) => {
      return acc + score[0];
    }, 0);
    const teamFrame2Score = playerScores.reduce((acc, score) => {
      return acc + score[1];
    }, 0);
    const teamBestScore = playerScores.reduce((acc, score) => {
      return acc + Math.max(score[0], score[1]);
    }, 0);

    return {
      teamId: team.teamId,
      teamName: team.abbreviation,
      teamLogo: team.logo,
      frame1: teamFrame1Score,
      frame2: teamFrame2Score,
      bestScore: teamBestScore,
    };
  });

  teamScores.sort((a, b) => {
    return b.bestScore - a.bestScore;
  });

  const showCarrot = (property) => {
    // if (orderBy === property) {
    //   return order === "asc" ? "▲" : "▼";
    // }
    return "";
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    teamScores.sort((a, b) => {
      switch (property) {
        case "team":
          return isAsc
            ? a.teamName.localeCompare(b.teamName)
            : b.teamName.localeCompare(a.teamName);
        case "frame1":
          return isAsc ? a.frame1 - b.frame1 : b.frame1 - a.frame1;
        case "frame2":
          return isAsc ? a.frame2 - b.frame2 : b.frame2 - a.frame2;
        case "bestScore":
          return isAsc ? a.bestScore - b.bestScore : b.bestScore - a.bestScore;
        default:
          return 0;
      }
    });
  };

  const StandingHeader = () => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-800 px-8 pt-1 rounded-t-md">
        <div
          className="w-1/4 text-center"
          onClick={() => handleRequestSort("team")}
        >
          Team{showCarrot("team")}
        </div>
        <div
          className="w-1/4 text-right"
          onClick={() => handleRequestSort("frame1")}
        >
          Frame 1{showCarrot("frame1")}
        </div>
        <div
          className="w-1/4 text-right"
          onClick={() => handleRequestSort("frame2")}
        >
          Frame 2{showCarrot("frame2")}
        </div>
        <div
          className="w-1/4 text-right"
          onClick={() => handleRequestSort("bestScore")}
        >
          Best{showCarrot("bestScore")}
        </div>
      </div>
    );
  };

  const StandingRow = ({ team }) => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-700 px-8">
        <div className="w-1/3 text-center overflow-hidden whitespace-nowrap overflow-ellipsis flex items-center">
          <Link href={`/teams/${team.teamId}`} className="flex">
            <div className="w-10 mr-2">
              <ShowUpload
                imageurl={team.teamLogo}
                altText={team.teamName}
                size={32}
              />
            </div>
            {team.teamName}
          </Link>
        </div>
        <div className="w-1/4 text-right">{team.frame1}</div>
        <div className="w-1/4 text-right">{team.frame2}</div>
        <div className="w-1/4 text-right">{team.bestScore}</div>
      </div>
    );
  };

  return (
    <div>
      <StandingHeader />
      {teamScores.map((team) => {
        if (team !== null) {
          return (
            <div key={team.teamId}>
              <StandingRow team={team} />
            </div>
          );
        }
      })}
    </div>
  );
};
export default BowlingTeamStandings;
