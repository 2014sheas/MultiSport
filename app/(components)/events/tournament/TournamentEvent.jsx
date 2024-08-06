"use client";
import React from "react";
import BtnGameCreation from "./BtnGameCreation";
import EventStandings from "./EventStandings";
import BtnCompleteEvent from "./BtnCompleteEvent";
import SeedSelection from "./SeedSelection";
import { useUser } from "@auth0/nextjs-auth0/client";
import EventMap from "../../location/EventMap";
import Bracket from "./Bracket";
import BracketMobile from "./BracketMobile";
import Link from "next/link";

const TournamentEvent = ({ event, teams, players, games }) => {
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const date = new Date(event.date);

  const adminBlock = () => {
    let eventStage = "Pre-Selection";
    if (event.seeds.length > 0) {
      eventStage = "Post-Selection";
    }
    if (games?.length > 0) {
      eventStage = "In-Progress";
      if (games?.find((game) => game.gameId === `${event.eventId}7`).winner) {
        eventStage = "Complete-Ready";
      }
    }
    if (event.status === "Completed") {
      eventStage = "Complete";
    }
    switch (eventStage) {
      case "Pre-Selection":
        return <SeedSelection event={event} teams={teams} />;

      case "Post-Selection":
        return (
          <div className="flex flex-col items-center w-4/5">
            <BtnGameCreation event={event} teams={teams} />
            <SeedSelection event={event} teams={teams} />
          </div>
        );
      case "In-Progress":
        return null;
      case "Complete-Ready":
        return (
          <div className="flex flex-col items-center w-4/5">
            <BtnCompleteEvent event={event} games={games} />
          </div>
        );
      case "Complete":
        return null;
      default:
        return null;
    }
  };

  const mapBlock = () => {
    if (event.status == "Upcoming" && event.location) {
      return (
        <div className="w-full flex flex-col items-center">
          <a
            href={`https://www.google.com/maps/dir//${event.location.formatted_address}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Get Directions
          </a>
          <EventMap location={event.location} />
        </div>
      );
    }
  };

  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center w-full">
        <h1>{event.name}</h1>
        <br />
        {isAdmin && adminBlock()}
        <h4>
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}
          {event.location ? ` at ${event.location.name}` : ""}
        </h4>
        <br />
        {mapBlock()}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center max-h-full overflow-visible">
        <h2>{event.name}</h2>
        {isAdmin && adminBlock()}
        <EventStandings games={games} teams={teams} event={event} />
        <div className="hidden md:flex">
          <Bracket
            event={event}
            teams={teams}
            players={players}
            games={games}
          />
        </div>
        <div className="md:hidden">
          <BracketMobile
            event={event}
            teams={teams}
            players={players}
            games={games}
          />
        </div>
      </div>
    );
  }
};

export default TournamentEvent;
