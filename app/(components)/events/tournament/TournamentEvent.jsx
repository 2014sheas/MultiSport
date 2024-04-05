"use client";
import React from "react";
import BtnGameCreation from "./BtnGameCreation";
import RoundContainer from "./RoundContainer";
import EventStandings from "./EventStandings";
import BtnCompleteEvent from "./BtnCompleteEvent";
import SeedSelection from "./SeedSelection";
import { useUser } from "@auth0/nextjs-auth0/client";

const TournamentEvent = ({ event, teams, players, games }) => {
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const adminBlock = () => {
    let eventStage = "Pre-Selection";
    if (event.seeds.length > 0) {
      eventStage = "Post-Selection";
    }
    if (games?.length > 0) {
      eventStage = "In-Progress";
    }
    if (games?.find((game) => game.gameId === `${event.eventId}15`).winner) {
      eventStage = "Complete-Ready";
    }
    if (event.status === "Completed") {
      eventStage = "Complete";
    }
    switch (eventStage) {
      case "Pre-Selection":
        return <SeedSelection event={event} teams={teams} />;
      case "Post-Selection":
        return (
          <div>
            <BtnGameCreation event={event} teams={teams} />
            <SeedSelection event={event} teams={teams} />
          </div>
        );
      case "In-Progress":
        return null;
      case "Complete-Ready":
        return <BtnCompleteEvent event={event} games={games} />;
      case "Complete":
        return null;
      default:
        return null;
    }
  };

  if (games.length === 0) {
    return (
      <div>
        <h1>{event.name}</h1>
        {isAdmin && adminBlock()}
      </div>
    );
  } else {
    const uniqueRounds = [...new Set(games.map((game) => game.round))].sort(
      (a, b) => a - b
    );
    return (
      <div className="flex flex-col items-center">
        <h1>{event.name}</h1>
        {isAdmin && adminBlock()}
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
