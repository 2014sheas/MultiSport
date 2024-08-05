import React from "react";
import { RoundContainer } from "./RoundContainer";

const Bracket = ({ event, teams, players, games }) => {
  const uniqueRounds = [...new Set(games.map((game) => game.round))];

  return (
    <div className="flex flex-row justify-center">
      {uniqueRounds.map((round, _index) => (
        <RoundContainer
          key={round}
          event={event}
          teams={teams}
          players={players}
          games={games.filter((game) => game.round === round)}
        />
      ))}
    </div>
  );
};

export default Bracket;
