"use client";

import { toFormData } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TeamForm = ({ team, players }) => {
  const EDITMODE = team._id !== "new";
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData({ ...formData, [e.target.name]: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Teams/${team._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update team" + res.status);
      }
    } else {
      const res = await fetch("/api/Teams", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create team" + res.status);
      }
    }

    if (formData.members != startingTeamData.members) {
      for (let i = 0; i < startingTeamData.members.length; i++) {
        const playerId = startingTeamData.members[i];
        const player = players.find((player) => player.playerId === playerId);
        const updatedPlayer = { ...player, team: "" };
        const res = await fetch(`/api/Players/${player._id}`, {
          method: "PUT",
          body: JSON.stringify({ formData: updatedPlayer }),
          "Content-Type": "application/json",
        });
        if (!res.ok) {
          throw new Error("Failed to update player" + res.status);
        }
      }
    }

    for (let i = 0; i < formData.members.length; i++) {
      const playerId = formData.members[i];
      const player = players.find((player) => player.playerId === playerId);
      const updatedPlayer = { ...player, team: team.teamId };
      const res = await fetch(`/api/Players/${player._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData: updatedPlayer }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update player" + res.status);
      }
    }

    router.refresh();
    router.push("/");
  };

  const startingTeamData = {
    name: "",
    teamId: "",
    abbreviation: "",
    members: [],
    captains: [],
  };

  if (EDITMODE) {
    startingTeamData.name = team.name;
    startingTeamData.teamId = team.teamId;
    startingTeamData.abbreviation = team.abbreviation;
    startingTeamData.members = team.members;
    startingTeamData.captains = team.captains;
  }

  const [formData, setFormData] = useState(startingTeamData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update" : "Create"} Team</h3>
        <label>Team Name </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Team ID </label>
        <input
          type="text"
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
        />
        <label>Abbreviation </label>
        <input
          type="text"
          name="abbreviation"
          value={formData.abbreviation}
          onChange={handleChange}
        />
        <label>Members </label>
        <select
          name="members"
          value={formData.members}
          onChange={handleMemberChange}
          multiple
        >
          {players.map((player) => (
            <option key={player.playerId} value={player.playerId}>
              {player.first_name + " " + player.last_name}
            </option>
          ))}
        </select>
        <label>Captains </label>
        <select
          name="captains"
          value={formData.captains}
          onChange={handleMemberChange}
          multiple
        >
          {formData.members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </select>
        <button type="submit">{EDITMODE ? "Update" : "Create"} Team</button>
      </form>
    </div>
  );
};

export default TeamForm;
