import React from "react";
import GameCard from "../../games/GameCard";

function LosersContainer({ event, teams, players, games }) {
  return (
    <div className="flex flex-col justify-around h-[125px]">
      {games.map((game) => (
        <GameCard
          key={game.gameId}
          game={game}
          allGames={games}
          event={event}
          teams={teams}
        />
      ))}
    </div>
  );
}

export default LosersContainer;
