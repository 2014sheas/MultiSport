"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const randomizeTeams = (teams) => {
  let randomizedTeams = teams.map((team) => team.teamId);
  for (let i = randomizedTeams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = randomizedTeams[i];
    randomizedTeams[i] = randomizedTeams[j];
    randomizedTeams[j] = temp;
  }
  return randomizedTeams;
};

const SoftballSelectTeams = ({ event, allTeams }) => {
  const EDITMODE =
    event.combinedTeam1 !== undefined && event.combinedTeam2 !== undefined;

  const router = useRouter();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const onClose = () => {
    setErrorModalOpen(false);
  };

  let teamIds = allTeams.map((team) => team.teamId);

  let startingTeams = {
    first: [teamIds[0], teamIds[1]],
    second: [teamIds[2], teamIds[3]],
  };

  if (EDITMODE) {
    startingTeams.first = [event.combinedTeam1[0], event.combinedTeam1[1]];
    startingTeams.second = [event.combinedTeam2[0], event.combinedTeam2[1]];
  }

  const [teams, setTeams] = React.useState(startingTeams);

  const handleTeamsChange = (e) => {
    const { name, value } = e.target;
    const [team, index] = name.split("-");
    const newTeams = { ...teams };
    newTeams[team][index] = value;
    setTeams(newTeams);
  };

  const handleRandomize = () => {
    const randomizedTeams = randomizeTeams(allTeams);
    const randomizedTeamsObject = {
      first: [randomizedTeams[0], randomizedTeams[1]],
      second: [randomizedTeams[2], randomizedTeams[3]],
    };

    setTeams(randomizedTeamsObject);

    console.log(randomizedTeamsObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamIds = [
      teams.first[0],
      teams.first[1],
      teams.second[0],
      teams.second[1],
    ];

    if (new Set(teamIds).size !== 4) {
      setErrorModalOpen(true);
      return;
    }

    const updatedEvent = {
      ...event,
      combinedTeam1: [teams.first[0], teams.first[1]],
      combinedTeam2: [teams.second[0], teams.second[1]],
    };

    const res = await fetch(`/api/Events/${event._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: updatedEvent }),
    });

    if (!res.ok) {
      console.error("Failed to update event");
    }
    const gameData = {
      gameId: `${event.eventId}1`,
      event: event.eventId,
      homeTeam: `${teams.first[0]}-${teams.first[1]}`,
      awayTeam: `${teams.second[0]}-${teams.second[1]}`,
      homeScore: 0,
      awayScore: 0,
      winner: "",
      loser: "",
      status: "Undetermined",
      type: "Softball",
      round: 1,
    };

    console.log(gameData);

    const res2 = await fetch("/api/Games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData: gameData }),
    });

    if (!res2.ok) {
      console.error("Failed to create game");
    }
  };

  return (
    <div className="flex justify-center w-3/5">
      <Modal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error"
        message="Invalid Seed Selection"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 bg-black border-2 border-black shadow-lg p-4">
          <h1 className="text-white">Invalid Team Selection</h1>
          <p className="text-center">
            Please ensure all teams are unique and valid
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white mt-4 p-2 rounded-md w-full"
          >
            Close
          </button>
        </Box>
      </Modal>
      <form
        className="flex flex-col w-1/2"
        method="put"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center">Select Teams</h1>
        <div className="flex flex-col">
          <label htmlFor="first">First Team</label>
          {/* two selects (one for each team on the first combined team) */}
          <select
            name="first-0"
            value={teams.first[0]}
            onChange={handleTeamsChange}
            className="p-2 rounded-md"
          >
            {teamIds.map((teamId) => (
              <option key={teamId} value={teamId}>
                {teamId}
              </option>
            ))}
          </select>
          <select
            name="first-1"
            value={teams.first[1]}
            onChange={handleTeamsChange}
            className="p-2 rounded-md"
          >
            {teamIds.map((teamId) => (
              <option key={teamId} value={teamId}>
                {teamId}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="second">Second Team</label>
          <select
            name="second-0"
            value={teams.second[0]}
            onChange={handleTeamsChange}
            className="p-2 rounded-md"
          >
            {teamIds.map((teamId) => (
              <option key={teamId} value={teamId}>
                {teamId}
              </option>
            ))}
          </select>
          <select
            name="second-1"
            value={teams.second[1]}
            onChange={handleTeamsChange}
            className="p-2 rounded-md"
          >
            {teamIds.map((teamId) => (
              <option key={teamId} value={teamId}>
                {teamId}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleRandomize}
          className="bg-blue-500 text-white mt-4 p-2 rounded-md"
        >
          Randomize Teams
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white mt-4 p-2 rounded-md"
        >
          Start Event
        </button>
      </form>
    </div>
  );
};

export default SoftballSelectTeams;
