"use client";

import { useState } from "react";
import React from "react";
import PlayerForm from "./PlayerForm";
import UploadForm from "../uploads/UploadForm";
import AttachEmail from "../userManagement/AttachEmail";

const verifiyEmailFormat = (email) => {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.match(emailFormat);
};

const PlayerEdit = ({ player, events }) => {
  const [editingImage, setEditingImage] = useState(false);
  const [addingEmail, setAddingEmail] = useState(false);

  const handleImageEditChange = () => {
    setEditingImage(!editingImage);
  };

  const handleAddEmail = () => {
    setAddingEmail(!addingEmail);
  };

  const hasEmail = player.email && verifiyEmailFormat(player.email);
  return (
    <div>
      {!hasEmail ? (
        <div>
          <button onClick={handleAddEmail} className="btn">
            Add Email
          </button>
          {addingEmail ? <AttachEmail player={player} /> : null}
          <br />
          <br />
          <br />
        </div>
      ) : null}
      <div className="flex flex-col items-center">
        <button onClick={handleImageEditChange} className="btn w-1/3">
          {editingImage ? "Back" : "Edit Profile Picture"}
        </button>
      </div>
      {editingImage ? (
        <div>
          <UploadForm profileType={"player"} profileUser={player} />
        </div>
      ) : (
        <PlayerForm player={player} events={events} />
      )}
    </div>
  );
};

export default PlayerEdit;
