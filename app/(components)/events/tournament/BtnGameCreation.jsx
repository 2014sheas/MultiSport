"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BtnGameCreation = ({ event }) => {
  console.log("Event: ", event);
  const createGames = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Games", {
      method: "DELETE",
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      throw new Error("Failed to delete games " + res.status);
    }
    for (let i = 1; i <= 4; i++) {
      let gameData = {
        gameId: `${event.eventId}${i}`,
        event: event.eventId,
        homeTeam: event.seeds[i - 1],
        awayTeam: event.seeds[8 - i],
        homeScore: 0,
        awayScore: 0,
        winner: "",
        loser: "",
        status: "Upcoming",
      };
      const res = await fetch("/api/Games", {
        method: "POST",
        body: JSON.stringify({ formData: gameData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create game" + res.status);
      }
    }
  };
  return <button onClick={createGames}>Create Games</button>;
};

export default BtnGameCreation;
