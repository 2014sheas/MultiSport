import React from "react";
import GameCard from "../../games/GameCard";
import WinnersContainer from "./WinnersContainer";
import LosersContainer from "./LosersContainer";

const SubContainer = ({ games, event, teams, numGames }) => {
  const numGameOptions = [
    "flex flex-col justify-around h-[100px]",
    "flex flex-col justify-around h-[200px]",
    "flex flex-col justify-around h-[300px]",
    "flex flex-col justify-around h-[400px]",
  ];

  return (
    <div className={numGameOptions[numGames - 1]}>
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
};

const RoundContainer = ({ event, teams, players, games }) => {
  let winnerGames = games.filter((game) => game.type == "Winners Bracket");
  let loserGames = games.filter((game) => game.type == "Losers Bracket");
  return (
    <div className="flex flex-col border-black w-[170px] items-center">
      <WinnersContainer
        event={event}
        teams={teams}
        players={players}
        games={winnerGames}
      />
      <LosersContainer
        event={event}
        teams={teams}
        players={players}
        games={loserGames}
      />
    </div>
  );
};

export { SubContainer, RoundContainer };
