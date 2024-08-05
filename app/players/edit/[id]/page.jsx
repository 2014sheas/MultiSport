import React from "react";
import PlayerEdit from "@/app/(components)/players/PlayerEdit";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

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

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const PlayerEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";

  let playerData = {};
  let updatePlayerData = {};

  const events = await getEvents();
  playerData = await getPlayerById(params.id);
  updatePlayerData = playerData.foundPlayer;

  const session = await getSession();
  const user = session?.user;
  const userCanEdit = user?.nickname === updatePlayerData.userId;

  if (!updatePlayerData) {
    return <p>Player not found</p>;
  }
  if (!userCanEdit) {
    redirect("/players/" + updatePlayerData.playerId);
    return <p>Unauthorized</p>;
  }

  return <PlayerEdit player={updatePlayerData} events={events} />;
};

export default PlayerEditPage;
