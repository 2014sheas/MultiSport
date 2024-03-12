"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TeamForm = ({ team }) => {
  const EDITMODE = team._id !== "new";
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    router.refresh();
    router.push("/");
  };

  const startingTeamData = {
    name: "",
    teamId: "",
    abbreviation: "",
  };

  if (EDITMODE) {
    startingTeamData.name = team.name;
    startingTeamData.teamId = team.teamId;
    startingTeamData.abbreviation = team.abbreviation;
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
        <button type="submit">{EDITMODE ? "Update" : "Create"} Team</button>
      </form>
    </div>
  );
};

export default TeamForm;
