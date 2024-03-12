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

const EventEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let eventData = {};
  let updateEventData = {};

  if (EDITMODE) {
    eventData = await getEventById(params.id);
    updateEventData = eventData.foundEvent;
  } else {
    updateEventData = {
      _id: "new",
    };
  }

  return <EventForm event={updateEventData} />;
};

export default EventEditPage;
