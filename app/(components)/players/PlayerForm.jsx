"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PlayerForm = ({ player }) => {
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const startingPlayerData = {
    name: "",
    playerId: "",
    nickname: "",
    bio: "",
    strengths: "",
    weaknesses: "",
  };

  startingPlayerData.name = player.name;
  startingPlayerData.playerId = player.playerId;
  startingPlayerData.nickname = player.nickname;
  startingPlayerData.bio = player.bio;
  startingPlayerData.strengths = player.strengths;
  startingPlayerData.weaknesses = player.weaknesses;

  const [formData, setFormData] = useState(startingPlayerData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1>Edit Player</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Player ID:</label>
        <input
          type="text"
          name="playerId"
          value={formData.playerId}
          onChange={handleChange}
        />
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
        <label>Strengths:</label>
        <input
          type="text"
          name="strengths"
          value={formData.strengths}
          onChange={handleChange}
        />
        <label>Weaknesses:</label>
        <input
          type="text"
          name="weaknesses"
          value={formData.weaknesses}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default PlayerForm;
