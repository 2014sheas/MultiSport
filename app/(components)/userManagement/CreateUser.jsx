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

const CreateUser = () => {
  const startingUserData = {
    email: "",
    given_name: "",
    family_name: "",
    nickname: "",
  };

  const [formData, setFormData] = useState(startingUserData);

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      password: generatePassword(),
      connection: "Username-Password-Authentication",
      email_verified: true,
    };

    // createNewUser(userData);
    const userRes = await fetch(`/api/Users`, {
      method: "POST",
      body: JSON.stringify({ formData: userData }),
      "Content-Type": "application/json",
    });
    if (!userRes.ok) {
      throw new Error("Failed to create user" + userRes.status);
    }

    const playerData = {
      playerId: formData.email.split("@")[0],
      first_name: formData.given_name,
      last_name: formData.family_name,
      nickname: formData.nickname,
      bio: "",
    };

    const playerRes = await fetch(`/api/Players`, {
      method: "POST",
      body: JSON.stringify({ formData: playerData }),
      "Content-Type": "application/json",
    });
    if (!playerRes.ok) {
      throw new Error("Failed to create player" + userRes.status);
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

        <label htmlFor="roles">Roles</label>
        {/* <select
            name="roles"
            value={formData.roles}
            onChange={handleChange}
            className="form-control"
            multiple
          >
            <option value="commish">Commish</option>
            <option value="admin">Admin</option>
            <option value="participant">Participant</option>
            <option value="scorekeeper">Scorekeeper</option>
          </select> */}

        <button type="submit" className="btn btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
