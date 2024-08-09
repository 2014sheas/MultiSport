"use client";
import React, { useState } from "react";
import ShowUpload from "./uploads/ShowUpload";
import Link from "next/link";

const Standings = ({ teams }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("totalPoints");

  const showCarrot = (property) => {
    if (orderBy === property) {
      return order === "asc" ? "▲" : "▼";
    }
    return "";
  };

  const StandingHeader = () => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-800 px-8 pt-1 rounded-t-md">
        <div
          className="w-1/6 text-center"
          onClick={() => handleRequestSort("team")}
        >
          Team{showCarrot("team")}
        </div>
        <div
          className="w-1/6 text-right"
          onClick={() => handleRequestSort("totalPoints")}
        >
          Points{showCarrot("totalPoints")}
        </div>
        <div
          className="w-1/6 text-right"
          onClick={() => handleRequestSort("first")}
        >
          First{showCarrot("first")}
        </div>
        <div
          className="w-1/6 text-right"
          onClick={() => handleRequestSort("second")}
        >
          Second{showCarrot("second")}
        </div>
        <div
          className="w-1/6 text-right"
          onClick={() => handleRequestSort("third")}
        >
          Third{showCarrot("third")}
        </div>
        <div
          className="w-1/6 text-right hidden md:block"
          onClick={() => handleRequestSort("fourth")}
        >
          Fourth{showCarrot("fourth")}
        </div>
      </div>
    );
  };

  const StandingRow = ({ team, logo }) => {
    return (
      <div className="flex justify-between w-full h-10 bg-gray-700 px-8">
        <div className="w-1/4 text-center overflow-hidden whitespace-nowrap overflow-ellipsis flex items-center">
          <Link href={`/teams/${team.teamId}`} className="flex">
            <div className="w-10 mr-2">
              <ShowUpload imageurl={team.logo} altText={team.name} size={32} />
            </div>
            {team.abbreviation}
          </Link>
        </div>
        <div className="w-1/5 text-right">{team.totalPoints}</div>
        <div className="w-1/5 text-right">{team.first.length}</div>
        <div className="w-1/5 text-right">{team.second.length}</div>
        <div className="w-1/5 text-right">{team.third.length}</div>
        <div className="w-1/6 text-right hidden md:block">
          {team.fourth.length}
        </div>
      </div>
    );
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    teams.sort((a, b) => {
      switch (property) {
        case "team":
          return isAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case "totalPoints":
          return isAsc
            ? a.totalPoints - b.totalPoints
            : b.totalPoints - a.totalPoints;
        default:
          return isAsc
            ? a[property].length - b[property].length
            : b[property].length - a[property].length;
      }
    });
  };

  return (
    <div className="w-full">
      {StandingHeader()}
      {teams.map((team, index) => (
        <StandingRow key={team.teamId} team={team} />
      ))}
    </div>
  );
};

export default Standings;
