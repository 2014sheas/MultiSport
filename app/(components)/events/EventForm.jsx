"use client";

import { set } from "mongoose";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EventForm = ({ event, teams }) => {
  const EDITMODE = event._id !== "new";
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validResults = true;
    let newFormData = { ...formData };
    newFormData.pointsArray = pointArrOptions[formData.pointsArray];

    if (formData.status === "Completed") {
      const resultsSet = new Set(results);
      if (resultsSet.size !== teams.length || results.includes("")) {
        validResults = false;
      } else {
        newFormData.results = results;
      }
    }
    if (!validResults) {
      alert("Invalid results");
    } else {
      if (EDITMODE) {
        const res = await fetch(`/api/Events/${event._id}`, {
          method: "PUT",
          body: JSON.stringify({ formData: newFormData }),
          "Content-Type": "application/json",
        });
        if (!res.ok) {
          throw new Error("Failed to update event" + res.status);
        }
      } else {
        const res = await fetch("/api/Events", {
          method: "POST",
          body: JSON.stringify({ formData: newFormData }),
          "Content-Type": "application/json",
        });
        if (!res.ok) {
          throw new Error("Failed to create event" + res.status);
        }
      }

      router.refresh();
      router.push("/");
    }
  };

  const startingEventData = {
    name: "",
    eventId: "",
    eventType: "Tournament",
    date: "",
    pointsArray: 0,
    status: "Upcoming",
    results: [],
  };

  const pointArrOptions = [
    [10, 8, 6, 4, 2, 2, 1, 1],
    [5, 4, 3, 2, 1, 1, 0, 0],
    [10, 10, 8, 8, 6, 6, 4, 4],
  ];

  if (EDITMODE) {
    const formattedDate = new Date(event.date).toISOString().slice(0, 16);

    startingEventData.name = event.name;
    startingEventData.eventId = event.eventId;
    startingEventData.eventType = event.eventType;
    startingEventData.date = formattedDate;
    startingEventData.pointsArray = pointArrOptions.indexOf(event.pointsArray);
    startingEventData.status = event.status;
    startingEventData.results = event.results;
  }

  const defaultResults = [
    EDITMODE ? event.results[0] : teams[0].teamId,
    EDITMODE ? event.results[1] : teams[1].teamId,
    EDITMODE ? event.results[2] : teams[2].teamId,
    EDITMODE ? event.results[3] : teams[3].teamId,
    EDITMODE ? event.results[4] : teams[4].teamId,
    EDITMODE ? event.results[5] : teams[5].teamId,
    EDITMODE ? event.results[6] : teams[6].teamId,
    EDITMODE ? event.results[7] : teams[7].teamId,
  ];

  const [results, setResults] = useState(defaultResults);

  const onResultsChange = (index) => (e) => {
    const newResults = [...results];
    newResults[index] = e.target.value;
    setResults(newResults);
  };
  const resultsOptions = teams.map((team) => (
    <option key={team._id} value={team.teamId}>
      {team.name}
    </option>
  ));

  const resultNames = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

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
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
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
        <label>Points Array</label>
        <select
          id="pointsArray"
          name="pointsArray"
          onChange={handleChange}
          required={true}
          value={formData.pointsArray}
        >
          <option value={0}>10, 8, 6, 4, 2, 2, 1, 1</option>
          <option value={1}>5, 4, 3, 2, 1, 1, 0, 0</option>
          <option value={2}>10, 10, 8, 8, 6, 6, 4, 4</option>
        </select>

        {/* DEBUG */}
        <label>Status</label>
        <select
          id="status"
          name="status"
          onChange={handleChange}
          required={true}
          value={formData.status}
        >
          <option value="Upcoming">Upcoming</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <label>Results</label>
        {/* inputs for 1st through 8th place */}
        <div>
          {resultNames.map((name, index) => (
            <div key={index}>
              <label>{name}</label>
              <select
                id={name}
                name={name}
                onChange={onResultsChange(index)}
                required={true}
                value={results[index]}
              >
                {resultsOptions}
              </select>
            </div>
          ))}
        </div>

        {/* DEBUG */}

        <button type="submit">{EDITMODE ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default EventForm;
