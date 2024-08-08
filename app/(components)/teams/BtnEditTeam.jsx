"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BtnEditTeam = ({ team }) => {
  const teamId = team.teamId;
  const router = useRouter();

  const handleEditTeam = () => {
    router.push("/teams/edit/" + teamId);
  };

  return (
    <button onClick={handleEditTeam} className="btn w-1/2">
      Edit Team
    </button>
  );
};

export default BtnEditTeam;
