"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BtnCompleteEvent = ({ event, games }) => {
  const router = useRouter();

  const eventId = event.eventId;
  const standings = {
    first: games.find((game) => game.gameId === `${eventId}15`).winner,
    second: games.find((game) => game.gameId === `${eventId}15`).loser,
    third: games.find((game) => game.gameId === `${eventId}13`).loser,
    fourth: games.find((game) => game.gameId === `${eventId}12`).loser,
  };

  const standingsArray = [
    standings.first,
    standings.second,
    standings.third,
    standings.fourth,
  ];

  event.status = "Completed";
  event.results = standingsArray;

  const completeEvent = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/Events/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: event }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update event" + res.status);
    } else {
      router.push(`/events/${eventId}`);
    }
  };
  return (
    <div>
      <button onClick={completeEvent}>Complete Event</button>
    </div>
  );
};

export default BtnCompleteEvent;
