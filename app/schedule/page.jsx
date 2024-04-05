import React from "react";
import Schedule from "../(components)/Schedule";

const BASE_URL = process.env.BASE_URL;

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const page = async () => {
  const events = await getEvents();

  return (
    <div className="flex flex-col items-center">
      <Schedule events={events} />
    </div>
  );
};

export default page;
