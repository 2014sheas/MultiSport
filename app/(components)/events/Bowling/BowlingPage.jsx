"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import EventMap from "../../location/EventMap";
import BtnStartEvent from "../BtnStartEvent";
import RatingStandings from "../RatingStandings";
import BowlingTeamForm from "./BowlingTeamForm";
import BowlingActivePage from "./BowlingActivePage";

const BowlingPage = ({ event, teams, players }) => {
  const { user, error, isLoading } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const date = new Date(event.date);

  players.forEach((player) => {
    if (!player.bowlscore) {
      player.bowlscore = [0, 0];
    }
  });

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

  const adminBlock = () => {
    if (isAdmin) {
      return (
        <div className="flex flex-col items-center w-full">
          <BtnStartEvent event={event} />
          <br />
        </div>
      );
    }
  };

  if (event.status == "Upcoming") {
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

        <RatingStandings event={event} teams={teams} players={players} />
      </div>
    );
  } else {
    return (
      <BowlingActivePage
        event={event}
        teams={teams}
        players={players}
        user={user}
      />
    );
  }
};

export default BowlingPage;
