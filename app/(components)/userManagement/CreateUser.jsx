"use client";
import { useState } from "react";

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

const CreateUser = ({ events }) => {
  const eventIds = events.map((event) => event.eventId);

  const ratings = eventIds.reduce((ratingObj, eventId) => {
    ratingObj[eventId] = 0;
    return ratingObj;
  }, {});

  const startingUserData = {
    email: "",
    given_name: "",
    family_name: "",
    nickname: "",
    bio: "",
    croppedArea: [],
    profile_image: "",
    ratings: ratings,
  };

  const [formData, setFormData] = useState(startingUserData);

  const onSubmit = async (e) => {
    e.preventDefault();

    let playerData = {
      playerId: `${formData.given_name}${formData.family_name}`,
      first_name: formData.given_name,
      last_name: formData.family_name,
      nickname: formData.nickname,
      bio: "",
      ratings: formData.ratings,
      profile_image: "",
      email: formData.email,
      userId: "",
      team: "",
      croppedArea: [],
      strengths: "",
      weaknesses: "",
      PastTeams: [],
      alerts: [],
    };

    if (formData.email) {
      playerData.userId = formData.email.split("@")[0];
      playerData.playerId = playerData.userId;
      const userData = {
        email: formData.email,
        given_name: formData.given_name,
        family_name: formData.family_name,
        password: generatePassword(),
        connection: "Username-Password-Authentication",
        email_verified: true,
      };

      const userRes = await fetch(`/api/Users`, {
        method: "POST",
        body: JSON.stringify({ formData: userData }),
        "Content-Type": "application/json",
      });
      if (!userRes.ok) {
        throw new Error("Failed to create user" + userRes.status);
      }
    }
    const playerRes = await fetch(`/api/Players`, {
      method: "POST",
      body: JSON.stringify({ formData: playerData }),
      "Content-Type": "application/json",
    });
    if (!playerRes.ok) {
      throw new Error("Failed to create player" + playerRes.status);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" method="post">
        <h1>Create Player</h1>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="given_name">First Name</label>
        <input
          type="text"
          name="given_name"
          value={formData.given_name}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="family_name">Last Name</label>
        <input
          type="text"
          name="family_name"
          value={formData.family_name}
          onChange={handleChange}
          className="form-control"
        />

        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="form-control"
        />

        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
