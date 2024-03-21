"use client";
import React from "react";
import updatePoints from "@/app/(components)/events/tournament/updatePoints";

const BtnUpdatePoints = () => {
  const onUpdatePoints = async () => {
    await updatePoints();
  };

  return (
    <div>
      <button
        onClick={onUpdatePoints}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Points
      </button>
    </div>
  );
};

export default BtnUpdatePoints;
