"use client";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";

const verifiyEmailFormat = (email) => {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.match(emailFormat);
};

const generatePassword = () => {
  //generate random password with 12 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
  let password = "";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let special = "!@#$%^&*()_+";
  let all = uppercase + lowercase + numbers + special;
  for (let i = 0; i < 12; i++) {
    let char = Math.floor(Math.random() * all.length);
    password += all.charAt(char);
  }
  return password;
};

const AttachEmail = (player) => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);

  const startingUserData = {
    email: "",
    given_name: player.first_name,
    family_name: player.last_name,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let playerData = player.player;

  const onSubmit = async () => {
    if (!verifiyEmailFormat(email)) {
      alert("Please enter a valid email address");
      return;
    }
    playerData = {
      ...playerData,
      email: email,
      userId: email.split("@")[0],
    };

    const userData = {
      given_name: playerData.first_name,
      family_name: playerData.last_name,
      email: email,
      password: generatePassword(),
      connection: "Username-Password-Authentication",
      email_verified: true,
    };

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData: userData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to create user" + res.status);
    }

    const playerRes = await fetch(`/api/Players/${playerData._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: playerData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!playerRes.ok) {
      throw new Error("Failed to update player" + playerRes.status);
    }

    setOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <div className="flex flex-col w-96 h-96 bg-gray-800 rounded-lg p-2 m-2">
        <h1 className="text-xl">Attach Email</h1>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="border border-black rounded-md p-2"
        />
        <button
          className="bg-blue-500 text-white mt-4 p-2 rounded-md"
          onClick={onSubmit}
        >
          Attach Email
        </button>
        <button
          className="bg-red-500 text-white mt-4 p-2 rounded-md"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Dialog>
  );
};

export default AttachEmail;
