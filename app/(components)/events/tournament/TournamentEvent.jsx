import React from "react";
import BtnGameCreation from "./BtnGameCreation";
import RoundContainer from "./RoundContainer";

const TournamentEvent = ({ event, teams, players, games }) => {
  if (games.length === 0) {
    return (
      <div>
        <h1>{event.name}</h1>
        <BtnGameCreation event={event} teams={teams} />
      </div>
    );
  } else {
    const uniqueRounds = [...new Set(games.map((game) => game.round))].sort(
      (a, b) => a - b
    );
    return (
      <div>
        <h1>{event.name}</h1>
        <BtnGameCreation event={event} teams={teams} />

        <div className="flex flex-row justify-center overflow-x-auto">
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
      </div>
    );
  }
};

export default TournamentEvent;
