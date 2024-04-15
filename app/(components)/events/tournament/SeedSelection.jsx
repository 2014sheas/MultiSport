"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const BASE_URL = process.env.BASE_URL;

const randomizeSeeds = (teams) => {
  let randomizedTeams = teams.map((team) => team.teamId);
  for (let i = randomizedTeams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = randomizedTeams[i];
    randomizedTeams[i] = randomizedTeams[j];
    randomizedTeams[j] = temp;
  }
  return randomizedTeams;
};

const SeedSelection = ({ event, teams }) => {
  const EDITMODE = event.seeds.length > 0;

  const router = useRouter();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const onClose = () => {
    setErrorModalOpen(false);
  };

  let teamIds = teams.map((team) => team.teamId);

  let startingSeeds = {
    first: teamIds[0],
    second: teamIds[1],
    third: teamIds[2],
    fourth: teamIds[3],
    fifth: teamIds[4],
    sixth: teamIds[5],
    seventh: teamIds[6],
    eighth: teamIds[7],
  };

  if (EDITMODE) {
    startingSeeds.first = event.seeds[0];
    startingSeeds.second = event.seeds[1];
    startingSeeds.third = event.seeds[2];
    startingSeeds.fourth = event.seeds[3];
    startingSeeds.fifth = event.seeds[4];
    startingSeeds.sixth = event.seeds[5];
    startingSeeds.seventh = event.seeds[6];
    startingSeeds.eighth = event.seeds[7];
  }

  const [seeds, setSeeds] = React.useState(startingSeeds);

  const handleSeedChange = (e) => {
    const { name, value } = e.target;
    setSeeds({ ...seeds, [name]: value });
  };

  const handleRandomize = () => {
    const randomizedSeeds = randomizeSeeds(teams);
    const randomizedSeedsObject = {
      first: randomizedSeeds[0],
      second: randomizedSeeds[1],
      third: randomizedSeeds[2],
      fourth: randomizedSeeds[3],
      fifth: randomizedSeeds[4],
      sixth: randomizedSeeds[5],
      seventh: randomizedSeeds[6],
      eighth: randomizedSeeds[7],
    };
    setSeeds(randomizedSeedsObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let seedsArray = Object.values(seeds);
    let validSeeds =
      seedsArray.every((seed) => teamIds.includes(seed)) &&
      seedsArray.length === new Set(seedsArray).size;

    if (!validSeeds) {
      setErrorModalOpen(true);
      return;
    }

    const formData = {
      ...event,
      seeds: Object.values(seedsArray),
    };

    const res = await fetch(`${BASE_URL}/Events/${event._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });

    if (res.status === 200) {
      console.log("Seeds Updated");
    } else {
      console.log("Failed to Update Seeds");
    }

    router.push(`/events/${event.eventId}`);
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
          <h1 className="text-white">Invalid Seed Selection</h1>
          <p className="text-center">
            Please ensure all seeds are unique and valid
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
        <h1 className="text-2xl font-bold text-center">
          {event.name} Seed Selection
        </h1>
        <div className="flex flex-col mt-4">
          <label htmlFor="first">First Seed</label>
          <select
            name="first"
            value={seeds.first}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="second">Second Seed</label>
          <select
            name="second"
            value={seeds.second}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="third">Third Seed</label>
          <select
            name="third"
            value={seeds.third}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="fourth">Fourth Seed</label>
          <select
            name="fourth"
            value={seeds.fourth}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="fifth">Fifth Seed</label>
          <select
            name="fifth"
            value={seeds.fifth}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="sixth">Sixth Seed</label>
          <select
            name="sixth"
            value={seeds.sixth}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="seventh">Seventh Seed</label>
          <select
            name="seventh"
            value={seeds.seventh}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="eighth">Eighth Seed</label>
          <select
            name="eighth"
            value={seeds.eighth}
            onChange={handleSeedChange}
            className="border border-black rounded-md p-2"
          >
            {teams.map((team, index) => (
              <option key={index} value={team.teamId}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleRandomize}
          className="bg-blue-500 text-white mt-4 p-2 rounded-md"
        >
          Randomize Seeds
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white mt-4 p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SeedSelection;
