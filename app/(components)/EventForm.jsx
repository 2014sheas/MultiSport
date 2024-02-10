"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EventForm = () => {
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Events", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to create event" + res.status);
    }
  };

  const startingEventData = {
    title: "",
    eventId: "",
    eventType: "Tournament",
    date: "",
    fullPoints: true,
    status: "Upcoming",
  };

  const [formData, setFormData] = useState(startingEventData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Event</h3>
        <label>Event Name</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Event ID</label>
        <input
          id="eventId"
          name="eventId"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.eventId}
        />
        <label>Event Type</label>
        <select
          id="type"
          name="type"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.eventType}
        >
          <option value="Tournament">Tournament</option>
          <option value="Scored">Scored</option>
        </select>
        <label>Date</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          onChange={handleChange}
          required={true}
          value={formData.date}
        />
        <label>Full Points</label>
        <select
          id="fullPoints"
          name="fullPoints"
          onChange={handleChange}
          required={true}
          value={formData.fullPoints}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EventForm;
