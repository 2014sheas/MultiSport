import React from "react";
import WinnersContainer from "./WinnersContainer";
import LosersContainer from "./LosersContainer";

function RoundContainer({ event, teams, players, games }) {
  let winnerGames = games.filter((game) => game.type == "Winners Bracket");
  let loserGames = games.filter((game) => game.type == "Losers Bracket");
  return (
    <div className="flex flex-col border-black w-[200px] items-center">
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
}

export default RoundContainer;
