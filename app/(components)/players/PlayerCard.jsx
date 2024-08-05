import React from "react";

function PlayerCard({ player, teams }) {
  return (
    <div className="flex flex-col w-`111` h-48 bg-gray-800 rounded-lg p-2 m-2">
      <p>{player.first_name}</p>
      <p>{player.last_name}</p>
    </div>
  );
}

export default PlayerCard;
