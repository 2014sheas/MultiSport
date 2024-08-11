import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import TeamEdit from "@/app/(components)/teams/TeamEdit";

const BASE_URL = process.env.BASE_URL;

const getTeamById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get team", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};

const TeamEditPage = async ({ params }) => {
  const players = await getPlayers();

  const allowedRoles = ["admin", "captain"];

  const teamData = await getTeamById(params.id);
  const updateTeamData = teamData.foundTeam;

  const session = await getSession();
  const user = session?.user;
  // const userCanEdit = true;
  let userCanEdit = false;
  if (user) {
    const userPlayer = players.find((player) => player.email === user.email);
    const userplayerId = userPlayer?.playerId;
    const userRoles = user?.["https://multisport.games/roles"];
    userCanEdit = userRoles.some((role) => allowedRoles.includes(role));
    if (userCanEdit) {
      if (userRoles.includes("admin")) {
        userCanEdit = true;
      } else if (userRoles.includes("captain")) {
        if (updateTeamData.captain === userplayerId) {
          userCanEdit = true;
        }
      }
    }
  }

  if (!updateTeamData) {
    return <p>Team not found</p>;
  }
  if (!userCanEdit) {
    redirect("/teams/" + updateTeamData.teamId);
    return <p>Unauthorized</p>;
  }

  return <TeamEdit team={updateTeamData} players={players} />;
};

export default TeamEditPage;
