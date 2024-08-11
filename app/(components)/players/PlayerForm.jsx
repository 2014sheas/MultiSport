"use client";

import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlayerForm = ({ player, events }) => {
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, newValue) => {
    setFormData({
      ...formData,
      ratings: { ...formData.ratings, [e.target.name]: newValue },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/Players/${player._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData }),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to update player" + res.status);
    }

    router.refresh();
    router.push("/");
  };

  const eventIds = events.map((event) => event.eventId);

  const ratings = eventIds.reduce((ratingObj, eventId) => {
    ratingObj[eventId] = 0;
    return ratingObj;
  }, {});

  const eventnameMap = events.reduce((eventObj, event) => {
    eventObj[event.eventId] = event.name;
    return eventObj;
  }, {});

  const startingPlayerData = {
    name: "",
    playerId: "",
    nickname: "",
    bio: "",
    strengths: "",
    weaknesses: "",
    profile_image: "Profile_Placeholder.png",
    ratings: ratings,
  };

  startingPlayerData.name = player.name;
  startingPlayerData.playerId = player.playerId;
  startingPlayerData.nickname = player.nickname;
  startingPlayerData.bio = player.bio;
  startingPlayerData.strengths = player.strengths;
  startingPlayerData.weaknesses = player.weaknesses;
  startingPlayerData.profile_image = player.profile_image;
  startingPlayerData.ratings = player.ratings;

  const [formData, setFormData] = useState(startingPlayerData);

  return (
    <div className="flex justify-center content-center flex-col items-center">
      <h1>{`Editing ${player.first_name} ${player.last_name}`}</h1>
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <label>Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />
        <label>Bio:</label>
        <input
          type="text"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <h3>Event Self-Ratings</h3>
        {eventIds.map((eventId) => (
          <div key={eventId} className="flex flex-row">
            <label className="w-32">{eventnameMap[eventId]}</label>
            <Rating
              name={eventId}
              value={formData.ratings[eventId]}
              onChange={handleRatingChange}
            />
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PlayerForm;
