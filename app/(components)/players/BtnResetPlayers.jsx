"use client";

function BtnResetPlayers() {
  const resetPlayers = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Players", {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete players " + res.status);
    }
    for (let i = 1; i < 33; i++) {
      let playerData = {
        name: "Player " + i,
        playerId: i,
        bio: "Bio for Player " + i,
      };
      const res = await fetch("/api/Players", {
        method: "POST",
        body: JSON.stringify({ formData: playerData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create players " + res.status);
      }
    }
  };
  return <button onClick={resetPlayers}>Reset Players</button>;
}

export default BtnResetPlayers;
