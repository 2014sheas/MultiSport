"use client";

function BtnResetTeams() {
  const ResetTeams = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Teams", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete teams " + res.status);
    }
    for (let i = 1; i < 9; i++) {
      let teamData = {
        name: "Team " + i,
        teamId: "team" + i,
        members: [],
        abbreviation: "T" + i,
      };
      const res = await fetch("/api/Teams", {
        method: "POST",
        body: JSON.stringify({ formData: teamData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create teams " + res.status);
      }
    }
  };
  return <button onClick={ResetTeams}>Reset Teams</button>;
}

export default BtnResetTeams;
