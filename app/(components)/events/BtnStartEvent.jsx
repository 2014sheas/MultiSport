import React from "react";
import { useRouter } from "next/navigation";

const BtnStartEvent = ({ event }) => {
  const router = useRouter();
  const updatedEvent = {
    ...event,
    status: "In Progress",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/Events/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: updatedEvent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to start event" + res.status);
    }
    router.push(`/events/${event.eventId}`);
  };

  return (
    <button onClick={handleSubmit} className="btn w-1/2">
      Start Event
    </button>
  );
};

export default BtnStartEvent;
