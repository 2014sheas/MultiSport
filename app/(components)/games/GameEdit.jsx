"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const GameEdit = ({ allGames, teams, game, event }) => {
  const router = useRouter();
  const { user } = useUser();
  const userRoles = user?.["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const teamIds = teams.map((team) => team.teamId);
  const homeTeam = teams.find((team) => team.teamId === game.homeTeam);
  const awayTeam = teams.find((team) => team.teamId === game.awayTeam);
  const hasHomeTeam = homeTeam ? true : false;
  const hasAwayTeam = awayTeam ? true : false;

  const [formData, setformData] = useState(game);

  const onFormChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    formData.homeScore = parseInt(formData.homeScore);
    formData.awayScore = parseInt(formData.awayScore);
    e.preventDefault();
    const res = await fetch(`/api/Games/${game._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update game" + res.status);
    } else {
      router.refresh();
    }
  };

  const onStartGame = async (e) => {
    e.preventDefault();
    formData.status = "In Progress";

    let winnerNextGame = allGames.find(
      (game) => game.gameId === formData.winnerNextGame
    );
    let loserNextGame = allGames.find(
      (game) => game.gameId === formData.loserNextGame
    );

    formData.homeScore = parseInt(formData.homeScore);
    formData.awayScore = parseInt(formData.awayScore);

    const res = await fetch(`/api/Games/${game._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update game" + res.status);
    }
    switch (game.nextGamePosition) {
      case "home":
        winnerNextGame.homeTeam = `${homeTeam.abbreviation}/${awayTeam.abbreviation}`;
        if (loserNextGame) {
          loserNextGame.homeTeam = `${homeTeam.abbreviation}/${awayTeam.abbreviation}`;
        }
        break;
      case "away":
        winnerNextGame.awayTeam = `${homeTeam.abbreviation}/${awayTeam.abbreviation}`;
        if (loserNextGame) {
          loserNextGame.awayTeam = `${homeTeam.abbreviation}/${awayTeam.abbreviation}`;
        }
        break;
      case "championship":
        winnerNextGame.awayTeam = `(if ${awayTeam.abbreviation} wins)`;
        break;
      default:
        break;
    }
    if (winnerNextGame) {
      const winnerNextGameRes = await fetch(
        `/api/Games/${winnerNextGame._id}`,
        {
          method: "PUT",
          body: JSON.stringify(winnerNextGame),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!winnerNextGameRes.ok) {
        throw new Error("Failed to update game" + winnerNextGameRes.status);
      }
    }
    if (loserNextGame) {
      const loserNextGameRes = await fetch(`/api/Games/${loserNextGame._id}`, {
        method: "PUT",
        body: JSON.stringify({ loserNextGame }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!loserNextGameRes.ok) {
        throw new Error("Failed to update game" + loserNextGameRes.status);
      }
    }
    router.refresh();
  };

  const onCompleteGame = async (e) => {
    e.preventDefault();

    //make homescore and awayscore numbers
    formData.homeScore = parseInt(formData.homeScore);
    formData.awayScore = parseInt(formData.awayScore);

    if (formData.homeScore === formData.awayScore) {
      alert("Game cannot end in a tie.");
    }
    if (formData.homeScore > formData.awayScore) {
      formData.winner = game.homeTeam;
      formData.loser = game.awayTeam;
    } else {
      formData.winner = game.awayTeam;
      formData.loser = game.homeTeam;
    }
    formData.status = "Completed";

    console.log(formData);

    let winnerNextGame = allGames.find(
      (game) => game.gameId === formData.winnerNextGame
    );
    let loserNextGame = allGames.find(
      (game) => game.gameId === formData.loserNextGame
    );

    const res = await fetch(`/api/Games/${game._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update game" + res.status);
    }
    switch (game.nextGamePosition) {
      case "home":
        winnerNextGame.homeTeam = formData.winner;
        if (teamIds.includes(winnerNextGame.awayTeam)) {
          winnerNextGame.status = "Upcoming";
        }
        if (loserNextGame) {
          loserNextGame.homeTeam = formData.loser;
          if (teamIds.includes(loserNextGame.awayTeam)) {
            loserNextGame.status = "Upcoming";
          }
        }
        break;
      case "away":
        winnerNextGame.awayTeam = formData.winner;
        if (teamIds.includes(winnerNextGame.homeTeam)) {
          winnerNextGame.status = "Upcoming";
        }
        if (loserNextGame) {
          loserNextGame.awayTeam = formData.loser;
          if (teamIds.includes(loserNextGame.homeTeam)) {
            loserNextGame.status = "Upcoming";
          }
        }
        break;
      case "championship":
        if (formData.winner === game.homeTeam) {
          winnerNextGame.winner = formData.winner;
          winnerNextGame.loser = formData.loser;
          winnerNextGame.status = "Completed";
        } else {
          winnerNextGame.homeTeam = formData.winner;
          winnerNextGame.awayTeam = formData.loser;
          winnerNextGame.status = "Upcoming";
        }
        break;
      default:
        break;
    }
    if (winnerNextGame) {
      const winnerNextGameRes = await fetch(
        `/api/Games/${winnerNextGame._id}`,
        {
          method: "PUT",
          body: JSON.stringify(winnerNextGame),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!winnerNextGameRes.ok) {
        throw new Error("Failed to update game" + winnerNextGameRes.status);
      }
    }
    if (loserNextGame) {
      const loserNextGameRes = await fetch(`/api/Games/${loserNextGame._id}`, {
        method: "PUT",
        body: JSON.stringify(loserNextGame),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!loserNextGameRes.ok) {
        throw new Error("Failed to update game" + loserNextGameRes.status);
      } else {
        router.push(`/events/${game.event}`);
      }
    } else {
      router.push(`/events/${game.event}`);
    }
  };

  const buttonSwitch = (status) => {
    if (event.status === "Completed") {
      // return disabled button
      return (
        <button type="submit" className="btn bg-slate-500 w-3/4" disabled>
          Event Completed
        </button>
      );
    }
    switch (status) {
      case "Upcoming":
        return (
          <button type="submit" className="btn w-1/2" onClick={onStartGame}>
            Start Game
          </button>
        );
      case "In Progress":
        return (
          <div className="flex flex-col">
            <br />
            <button type="submit" className="btn w-1/2" onClick={onSubmit}>
              Update Score
            </button>
            <br />
            <button type="submit" className="btn" onClick={onCompleteGame}>
              Complete Game
            </button>
          </div>
        );
      case "Completed":
        return (
          <div className="flex flex-col">
            <br />
            <button type="submit" className="btn w-1/4" onClick={onSubmit}>
              Update Score
            </button>
            <br />
            <button
              type="submit"
              className="btn w-1/4"
              onClick={onCompleteGame}
            >
              Complete Game
            </button>
          </div>
        );
      default:
        break;
    }
  };

  if (!isAdmin) {
    return (
      <div>
        <h2>Not Authorized</h2>
        <p>You are not authorized to edit this game.</p>
        <p>Only Admins, Commissioners, and Scorekeepers can edit games.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center border-2 rounded-lg bg-slate-900 w-11/12">
      <h2> {game.status}</h2>
      <form>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-center w-1/2">
            <label className="text-center font-bold text-lg">
              {hasHomeTeam ? homeTeam.abbreviation : game.homeTeam}
            </label>
            <br />
            <input
              type="number"
              name="homeScore"
              value={formData.homeScore}
              onChange={onFormChange}
            />
          </div>
          <div className="flex flex-col items-center w-1/2">
            <label className="text-center font-bold text-lg">
              {hasAwayTeam ? awayTeam.abbreviation : game.awayTeam}
            </label>
            <br />
            <input
              type="number"
              name="awayScore"
              value={formData.awayScore}
              onChange={onFormChange}
            />
          </div>
        </div>
        <div>{buttonSwitch(game.status)}</div>
      </form>
    </div>
  );
};

export default GameEdit;
