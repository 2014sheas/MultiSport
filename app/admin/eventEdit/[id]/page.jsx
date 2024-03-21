import React from "react";
import EventForm from "../../../(components)/events/EventForm";

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

const EventEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let eventData = {};
  let updateEventData = {};
  const teams = await getTeams();

  if (EDITMODE) {
    eventData = await getEventById(params.id);
    updateEventData = eventData.foundEvent;
  } else {
    updateEventData = {
      _id: "new",
    };
  }

  return <EventForm event={updateEventData} teams={teams} />;
};

export default EventEditPage;
