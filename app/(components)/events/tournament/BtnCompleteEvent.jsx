"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import updatePoints from "../updatePoints";

const BtnCompleteEvent = ({ event, games }) => {
  const router = useRouter();

  const eventId = event.eventId;
  const standings = {
    first: games.find((game) => game.gameId === `${eventId}7`).winner,
    second: games.find((game) => game.gameId === `${eventId}7`).loser,
    third: games.find((game) => game.gameId === `${eventId}5`).loser,
    fourth: games.find((game) => game.gameId === `${eventId}4`).loser,
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
      await updatePoints();
      router.push(`/standings`);
    }
  };
  return (
    <div>
      <br />
      <button onClick={completeEvent} className="btn">
        Complete Event
      </button>
      <br />
    </div>
  );
};

export default BtnCompleteEvent;
