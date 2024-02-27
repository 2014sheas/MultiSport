import React from "react";
import SeedSelection from "@/app/(components)/events/tournament/SeedSelection";

const getEventById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Events/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get event", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const EventSeedSelection = async ({ params }) => {
  const foundEvent = await getEventById(params.id);
  const event = foundEvent.foundEvent;
  const teams = await getTeams();

  return <SeedSelection event={event} teams={teams} />;
};

export default EventSeedSelection;
