import React from "react";
import PlayerForm from "../../../(components)/players/PlayerForm";

const BASE_URL = process.env.BASE_URL;

const getPlayerById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get player", error);
  }
};

const PlayerEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";

  let playerData = {};
  let updatePlayerData = {};

  if (EDITMODE) {
    playerData = await getPlayerById(params.id);
    updatePlayerData = playerData.foundPlayer;
  } else {
    updatePlayerData = {
      _id: "new",
    };
  }

  return <PlayerForm player={updatePlayerData} />;
};

export default PlayerEditPage;
