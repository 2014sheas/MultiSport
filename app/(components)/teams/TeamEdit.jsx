"use client";

import { useState } from "react";
import React from "react";
import TeamCaptainForm from "./TeamCaptainForm";
import UploadForm from "../uploads/UploadForm";

const TeamEdit = ({ team, players }) => {
  const [editingImage, setEditingImage] = useState(false);
  const [addingEmail, setAddingEmail] = useState(false);

  const handleImageEditChange = () => {
    setEditingImage(!editingImage);
  };

  return (
    <div>
      <br />
      <div className="flex flex-col justify-center items-center gap-4">
        <h2>Update {team.name}</h2>

        <button onClick={handleImageEditChange} className="btn w-1/2">
          {editingImage ? "Back" : "Change Logo"}
        </button>
      </div>
      {editingImage ? (
        <div>
          <UploadForm profileType={"team"} profileUser={team} />
        </div>
      ) : (
        <TeamCaptainForm team={team} players={players} />
      )}
    </div>
  );
};

export default TeamEdit;
