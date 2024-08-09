"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const BowlingTeamForm = ({ team, players }) => {
  const router = useRouter();
  const playersOnTeam = players.filter((player) =>
    team.members.includes(player.playerId)
  );

  // Sort team members by last name, using first name as a tiebreaker
  playersOnTeam.sort((a, b) => {
    if (a.last_name < b.last_name) {
      return -1;
    } else if (a.last_name > b.last_name) {
      return 1;
    } else {
      if (a.first_name < b.first_name) {
        return -1;
      } else if (a.first_name > b.first_name) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  // form to edit each team member's bowlScore
  const [formData, setFormData] = useState({
    scores: playersOnTeam.map((player) => ({
      playerId: player.playerId,
      scores: player.bowlScore || [0, 0], // Initialize with two scores if not present
    })),
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      scores: formData.scores.map((score) =>
        score.playerId === name
          ? {
              ...score,
              scores: score.scores.map((s, i) =>
                i === index ? Number(value) : s
              ),
            }
          : score
      ),
    });
  };

  //loop through all players on team and update thweir bowlScore
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const score of formData.scores) {
      const player = players.find(
        (player) => player.playerId === score.playerId
      );
      const updatedPlayer = { ...player, bowlScore: score.scores };
      console.log(updatedPlayer);
      const res = await fetch(`/api/Players/${player._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData: updatedPlayer }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update player" + res.status);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <h2>{team.name}</h2>
        <div className="flex flex-row items-center w-full">
          <p className="w-1/3">Player</p>
          <p className="w-1/3">Frame 1</p>
          <p className="w-1/3">Frame 2</p>
        </div>
        {formData.scores.map((score) => (
          <div
            key={score.playerId}
            className="flex flex-row items-center w-full"
          >
            <p className="w-1/3">
              {
                players.find((player) => player.playerId === score.playerId)
                  .first_name
              }{" "}
              {
                players.find((player) => player.playerId === score.playerId)
                  .last_name
              }
            </p>
            <input
              type="number"
              name={score.playerId}
              value={score.scores[0]}
              onChange={(e) => handleChange(e, 0)}
              className="w-1/3"
            />

            <input
              type="number"
              name={score.playerId}
              value={score.scores[1]}
              onChange={(e) => handleChange(e, 1)}
              className="w-1/3"
            />
          </div>
        ))}
        <button type="submit" className="btn w-1/2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BowlingTeamForm;
