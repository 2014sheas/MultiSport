import React from "react";

const BowlingTeamScores = ({ players, team }) => {
  const playersOnTeam = players.filter((player) =>
    team.members.includes(player.playerId)
  );
  if (playersOnTeam.length === 0) {
    return <div>No players on this team</div>;
  }
  const playerScores = playersOnTeam.map((player) => {
    if (player.bowlScore === undefined || player.bowlScore.length != 2) {
      return {
        playerName: `${player.first_name} ${player.last_name}`,
        bowlScore: [0, 0],
      };
    }
    //make sure all scores are numeric
    player.bowlScore = player.bowlScore.map((score) => {
      return isNaN(score) ? 0 : score;
    });
    return {
      playerName: `${player.first_name} ${player.last_name}`,
      bowlScore: player.bowlScore,
    };
  });

  const teamFrame1Score = playerScores.reduce((acc, score) => {
    return acc + score.bowlScore[0];
  }, 0);
  const teamFrame2Score = playerScores.reduce((acc, score) => {
    return acc + score.bowlScore[1];
  }, 0);
  const teamBestScore = playerScores.reduce((acc, score) => {
    return acc + Math.max(score.bowlScore[0], score.bowlScore[1]);
  }, 0);

  const totalRow = () => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-700 px-8 border-t-2 pt-2">
        <div className="w-1/3 text-right">Total</div>
        <div className="w-1/4 text-right">{teamFrame1Score}</div>
        <div className="w-1/4 text-right">{teamFrame2Score}</div>
        <div className="w-1/6 text-right">{teamBestScore}</div>
      </div>
    );
  };

  const headerRow = () => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-800 px-8">
        <div className="w-1/3 text-right">Name</div>
        <div className="w-1/4 text-right">Frame 1</div>
        <div className="w-1/4 text-right">Frame 2</div>
        <div className="w-1/6 text-right">Best</div>
      </div>
    );
  };

  const playerRows = (player) => {
    return (
      <div
        className="flex justify-between w-full h-10 bg-gray-700 px-8"
        key={player.playerId}
      >
        <div className="w-1/3 text-right overflow-hidden whitespace-nowrap overflow-ellipsis">
          {player.playerName}
        </div>
        <div className="w-1/4 text-right">{player.bowlScore[0]}</div>
        <div className="w-1/4 text-right">{player.bowlScore[1]}</div>
        <div className="w-1/6 text-right">
          {Math.max(player.bowlScore[0], player.bowlScore[1])}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h2>{team.name}</h2>
      {headerRow()}
      {playerScores.map((player) => {
        {
          return playerRows(player);
        }
      })}
      {totalRow()}
    </div>
  );
};

export default BowlingTeamScores;
