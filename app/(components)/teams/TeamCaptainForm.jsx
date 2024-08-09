"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TeamCaptainForm = ({ team, players }) => {
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.sixth = ["Basbeall", "Basketball", "Football", "Soccer"];
    const res = await fetch(`/api/Teams/${team._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData }),
      "Content-Type": "application/json",
    });
    if (!res.ok) {
      throw new Error("Failed to update team" + res.status);
    }

    router.refresh();
    router.push("/teams/" + team.teamId);
  };

  const startingTeamData = {
    name: "",
    abbreviation: "",
    motto: "",
  };

  startingTeamData.name = team.name;
  startingTeamData.abbreviation = team.abbreviation;
  startingTeamData.motto = team.motto;

  const [formData, setFormData] = useState(startingTeamData);

  return (
    <div className="flex flex-col justify-center items-center">
      <br />
      <form
        className="flex flex-col gap-3 w-5/6"
        method="post"
        onSubmit={handleSubmit}
      >
        <label>Team Name </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Abbreviation </label>
        <input
          type="text"
          name="abbreviation"
          value={formData.abbreviation}
          onChange={handleChange}
          maxLength={4}
        />
        <label>Motto</label>
        <input
          type="text"
          name="motto"
          value={formData.motto}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Update Team
        </button>
      </form>
    </div>
  );
};

export default TeamCaptainForm;
