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
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[7])
        .teamAbbreviation,
    },
    {
      homeTeam: teamIdMap.find((team) => team.teamID === event.seeds[1])
        .teamAbbreviation,
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[6])
        .teamAbbreviation,
    },
    {
      homeTeam: teamIdMap.find((team) => team.teamID === event.seeds[2])
        .teamAbbreviation,
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[5])
        .teamAbbreviation,
    },
    {
      homeTeam: teamIdMap.find((team) => team.teamID === event.seeds[3])
        .teamAbbreviation,
      awayTeam: teamIdMap.find((team) => team.teamID === event.seeds[4])
        .teamAbbreviation,
    },
  ];

  const secondRoundPlaceholders = firstRoundMatchups.map(
    (matchup) => `${matchup.homeTeam}/${matchup.awayTeam}`
  );

  const gameDataArray = [
    {
      gameId: `${event.eventId}1`,
      event: event.eventId,
      homeTeam: event.seeds[0],
      awayTeam: event.seeds[7],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}5`,
      loserNextGame: `${event.eventId}8`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}2`,
      event: event.eventId,
      homeTeam: event.seeds[1],
      awayTeam: event.seeds[6],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}5`,
      loserNextGame: `${event.eventId}8`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}3`,
      event: event.eventId,
      homeTeam: event.seeds[2],
      awayTeam: event.seeds[5],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}6`,
      loserNextGame: `${event.eventId}9`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}4`,
      event: event.eventId,
      homeTeam: event.seeds[3],
      awayTeam: event.seeds[4],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Upcoming",
      type: "Winners Bracket",
      round: 1,
      winnerNextGame: `${event.eventId}6`,
      loserNextGame: `${event.eventId}9`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}5`,
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
      winnerNextGame: `${event.eventId}7`,
      loserNextGame: `${event.eventId}11`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}6`,
      event: event.eventId,
      homeTeam: secondRoundPlaceholders[2],
      awayTeam: secondRoundPlaceholders[3],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 2,
      winnerNextGame: `${event.eventId}7`,
      loserNextGame: `${event.eventId}10`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}7`,
      event: event.eventId,
      homeTeam: `Winner ${event.eventId}5`,
      awayTeam: `Winner ${event.eventId}6`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 3,
      winnerNextGame: `${event.eventId}14`,
      loserNextGame: `${event.eventId}13`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}8`,
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
      winnerNextGame: `${event.eventId}10`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}9`,
      event: event.eventId,
      homeTeam: secondRoundPlaceholders[2],
      awayTeam: secondRoundPlaceholders[3],
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 2,
      winnerNextGame: `${event.eventId}11`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}10`,
      event: event.eventId,
      homeTeam: `Winner ${event.eventId}8`,
      awayTeam: `Loser ${event.eventId}6`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 3,
      winnerNextGame: `${event.eventId}12`,
      nextGamePosition: "home",
    },
    {
      gameId: `${event.eventId}11`,
      event: event.eventId,
      homeTeam: `Winner ${event.eventId}9`,
      awayTeam: `Loser ${event.eventId}5`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 3,
      winnerNextGame: `${event.eventId}12`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}12`,
      event: event.eventId,
      homeTeam: `Winner ${event.eventId}10`,
      awayTeam: `Winner ${event.eventId}11`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 4,
      winnerNextGame: `${event.eventId}13`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}13`,
      event: event.eventId,
      homeTeam: `Loser ${event.eventId}7`,
      awayTeam: `Winner ${event.eventId}12`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Losers Bracket",
      round: 5,
      winnerNextGame: `${event.eventId}14`,
      nextGamePosition: "away",
    },
    {
      gameId: `${event.eventId}14`,
      event: event.eventId,
      homeTeam: `Winner ${event.eventId}7`,
      awayTeam: `Winner ${event.eventId}13`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 6,
      winnerNextGame: `${event.eventId}15`,
      loserNextGame: `${event.eventId}15`,
      nextGamePosition: "championship",
    },
    {
      gameId: `${event.eventId}15`,
      event: event.eventId,
      homeTeam: `If Necessary`,
      awayTeam: ``,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Winners Bracket",
      round: 7,
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
    router.push(`/events/${event.eventId}`);
  };
  return <button onClick={createGames}>Create Games</button>;
};

export default BtnGameCreation;
