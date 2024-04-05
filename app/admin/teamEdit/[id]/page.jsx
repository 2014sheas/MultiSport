import React from "react";
import TeamForm from "@/app/(components)/teams/TeamForm";

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

const TeamEditPage = async ({ params }) => {
  const EDITMODE = params.id !== "new";

  let teamData = {};
  let updateTeamData = {};

  if (EDITMODE) {
    teamData = await getTeamById(params.id);
    updateTeamData = teamData.foundTeam;
  } else {
    updateTeamData = {
      _id: "new",
    };
  }
  return <TeamForm team={updateTeamData} />;
};

export default TeamEditPage;
