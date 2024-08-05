"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BtnEditPlayer = ({ player }) => {
  const playerId = player.playerId;
  const router = useRouter();

  const handleEditPlayer = () => {
    router.push("/players/edit/" + playerId);
  };

  return (
    <button onClick={handleEditPlayer} className="btn">
      Edit Profile
    </button>
  );
};

export default BtnEditPlayer;
