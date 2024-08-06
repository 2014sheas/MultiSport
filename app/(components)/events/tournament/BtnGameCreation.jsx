"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BtnGameCreation = ({ event, teams }) => {
  const router = useRouter();

  const teamIdMap = teams.map((team) => ({
    teamID: team.teamId,
    teamAbbreviation: team.abbreviation,
  }));

  const firstRoundMatchups = [
    {
      homeTeam: teamIdMap.find((team) => team.teamID === event.seeds[0])
        .teamAbbreviation,
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[3])
        .teamAbbreviation,
    },
    {
      homeTeam: teamIdMap.find((team) => team.teamID === event.seeds[1])
        .teamAbbreviation,
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[2])
        .teamAbbreviation,
    },
  ];

  const secondRoundPlaceholders = firstRoundMatchups.map(
    (matchup) => `${matchup.homeTeam}/${matchup.awayTeam}`
  );
  // All games for an event (4-team tournament)
  const gameDataArray = [
    {
      gameId: `${event.eventId}1`,
      event: event.eventId,
      homeTeam: event.seeds[0],
      awayTeam: event.seeds[3],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}3`,
      loserNextGame: `${event.eventId}4`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}2`,
      event: event.eventId,
      homeTeam: event.seeds[1],
      awayTeam: event.seeds[2],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}3`,
      loserNextGame: `${event.eventId}4`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}3`,
      event: event.eventId,
      homeTeam: secondRoundPlaceholders[0],
      awayTeam: secondRoundPlaceholders[1],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 2,
      winnerNextGame: `${event.eventId}6`,
      loserNextGame: `${event.eventId}5`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}4`,
      event: event.eventId,
      homeTeam: secondRoundPlaceholders[0],
      awayTeam: secondRoundPlaceholders[1],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 2,
      winnerNextGame: `${event.eventId}5`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}5`,
      event: event.eventId,
      homeTeam: `Loser Game 3`,
      awayTeam: `Winner Game 4`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 3,
      winnerNextGame: `${event.eventId}6`,
      nextGamePosition: "away",
    },

    {
      gameId: `${event.eventId}6`,
      event: event.eventId,
      homeTeam: `Winner Game 3`,
      awayTeam: `Winner Game 5`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 4,
      winnerNextGame: `${event.eventId}7`,
      loserNextGame: `${event.eventId}7`,
      nextGamePosition: "championship",
    },
    {
      gameId: `${event.eventId}7`,
      event: event.eventId,
      homeTeam: `If Necessary`,
      awayTeam: ``,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 5,
      nextGamePosition: "championship2",
    },
  ];

  const createGames = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Games", {
      method: "DELETE",
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      throw new Error("Failed to delete games " + res.status);
    }
    // create games
    for (let gameData of gameDataArray) {
      const res = await fetch("/api/Games", {
        method: "POST",
        body: JSON.stringify({ formData: gameData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create game" + res.status);
      }
    }
    // change event status to In Progress
    event.status = "In Progress";
    const res2 = await fetch(`/api/Events/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: event }),
      "Content-Type": "application/json",
    });
    if (!res2.ok) {
      throw new Error("Failed to update event" + res.status);
    }
    router.push(`/events/${event.eventId}`);
  };
  return (
    <button onClick={createGames} className="btn w-1/3">
      Create Games
    </button>
  );
};

export default BtnGameCreation;
