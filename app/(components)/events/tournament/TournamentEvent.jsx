import React from "react";
import BtnGameCreation from "./BtnGameCreation";
import RoundContainer from "./RoundContainer";
import EventStandings from "./EventStandings";
import BtnCompleteEvent from "./BtnCompleteEvent";
import SeedSelection from "./SeedSelection";

const TournamentEvent = ({ event, teams, players, games }) => {
  if (games.length === 0) {
    return (
      <div>
        <h1>{event.name}</h1>
        {event.seeds.length === 0 && (
          <SeedSelection event={event} teams={teams} />
        )}
        {event.seeds.length > 0 && (
          <BtnGameCreation event={event} teams={teams} />
        )}
      </div>
    );
  } else {
    const uniqueRounds = [...new Set(games.map((game) => game.round))].sort(
      (a, b) => a - b
    );
    return (
      <div className="flex flex-col items-center">
        <h1>{event.name}</h1>
        <BtnGameCreation event={event} teams={teams} />

        {games.find((game) => game.gameId === `${event.eventId}15`).winner && (
          <BtnCompleteEvent event={event} games={games} />
        )}

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
        <EventStandings games={games} teams={teams} event={event} />
      </div>
    );
  }
};

export default TournamentEvent;
