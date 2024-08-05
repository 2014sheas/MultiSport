"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  ControlPosition,
} from "@vis.gl/react-google-maps";

import MapHandler from "../location/map-handler";
import { CustomMapControl } from "../location/map-control";

const EventForm = ({ event, teams }) => {
  const EDITMODE = event._id !== "new";
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (place) => {
    setFormData({ ...formData, location: place });
  };

  const position = {
    lat: 41.9242,
    lng: -70.5494,
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
    location: null,
  };

  const pointArrOptions = [
    [10, 7, 4, 2],
    [5, 3, 2, 1],
    [15, 10, 6, 3],
    [10, 10, 4, 4],
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
    startingEventData.location = event.location;
  }

  const defaultResults = [
    EDITMODE ? event.results[0] : teams[0].teamId,
    EDITMODE ? event.results[1] : teams[1].teamId,
    EDITMODE ? event.results[2] : teams[2].teamId,
    EDITMODE ? event.results[3] : teams[3].teamId,
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

  const resultNames = ["1st", "2nd", "3rd", "4th"];

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
          suppressHydrationWarning={true}
        />
        <label>Points Array</label>
        <select
          id="pointsArray"
          name="pointsArray"
          onChange={handleChange}
          required={true}
          value={formData.pointsArray}
        >
          <option value={0}>10, 7, 4, 2</option>
          <option value={1}>5, 3, 2, 1</option>
          <option value={2}>15, 10, 6, 3</option>
          <option value={3}>10, 10, 4, 4</option>
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
        <div>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <div className="w-full h-96">
              <Map
                defaultZoom={9}
                defaultCenter={position}
                mapId="a9dbda75f7cf88c5"
                disableDefaultUI={true}
              >
                <AdvancedMarker
                  position={position}
                  onClick={() => setOpen(true)}
                >
                  <Pin />{" "}
                </AdvancedMarker>
              </Map>
              <MapHandler place={formData.location} />
              <CustomMapControl
                controlPosition={ControlPosition.TOP}
                onPlaceSelect={handleLocationChange}
              />
            </div>
          </APIProvider>
        </div>

        {/* DEBUG */}
        <label>Results</label>
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

        <button type="submit">{EDITMODE ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default EventForm;
