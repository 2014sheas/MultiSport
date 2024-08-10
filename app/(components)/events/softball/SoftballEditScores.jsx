"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SoftballEditScores = ({ teams, game, event }) => {
  console.log(game);
  const [team1Score, setTeam1Score] = useState(game.homeScore);
  const [team2Score, setTeam2Score] = useState(game.awayScore);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make sure scores are numbers
    const formData = {
      ...game,
      homeScore: parseInt(team1Score),
      awayScore: parseInt(team2Score),
    };

    const res = await fetch(`/api/Games/${game._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update game" + res.status);
    } else {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-lg py-4 bg-slate-900 w-5/6 md:w-3/5 max-w-[600px]">
      <h2>Edit Team Scores</h2>
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-row justify-between w-full mb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center w-1/2">
              <label className="text-center font-bold text-lg">
                {teams[0].abbreviation}
              </label>
              <input
                type="number"
                value={team1Score}
                onChange={(e) => setTeam1Score(e.target.value)}
                className="text-center w-1/2"
              />
            </div>
            <div className="flex flex-col items-center w-1/2">
              <label className="text-center font-bold text-lg">
                {teams[1].abbreviation}
              </label>
              <input
                type="number"
                value={team2Score}
                onChange={(e) => setTeam2Score(e.target.value)}
                className="text-center w-1/2"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Scores
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoftballEditScores;
