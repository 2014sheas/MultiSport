"use client";
import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Tab,
  TableSortLabel,
} from "@mui/material";

const headCells = [
  { id: "team", label: "Team", numeric: false },
  { id: "points", label: "Points", numeric: true },
  { id: "first", label: "First", numeric: true },
  { id: "second", label: "Second", numeric: true },
  { id: "third", label: "Third", numeric: true },
  { id: "fourth", label: "Fourth", numeric: true },
];

const Standings = ({ teams }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = React.useState("points");

  const handleRequestSort = (event, property) => {
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

  const headCells = [
    { id: "team", label: "Team", numeric: false },
    { id: "totalPoints", label: "Points", numeric: true },
    { id: "first", label: "First", numeric: true },
    { id: "second", label: "Second", numeric: true },
    { id: "third", label: "Third", numeric: true },
    { id: "fourth", label: "Fourth", numeric: true },
  ];

  return (
    <div>
      <h1>Standings</h1>
      <Table className="w-1/2 size=small bg-slate-600 dark:bg-gray-800">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                className="text-white"
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={(event) => handleRequestSort(event, headCell.id)}
                  className="text-white"
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow
              key={team.teamId}
              className="even:bg-gray-300 odd:bg-gray-500 dark:even:bg-gray-700 dark:odd:bg-gray-800"
            >
              <TableCell align="center" className="text-white">
                {team.name}
              </TableCell>
              <TableCell align="center" className="text-white">
                {team.totalPoints}
              </TableCell>
              <TableCell
                align="center"
                title={team.first}
                className="text-white"
              >
                {team.first.length}
              </TableCell>
              <TableCell
                align="center"
                title={team.second}
                className="text-white"
              >
                {team.second.length}
              </TableCell>
              <TableCell
                align="center"
                title={team.third}
                className="text-white"
              >
                {team.third.length}
              </TableCell>
              <TableCell
                align="center"
                title={team.fourth}
                className="text-white"
              >
                {team.fourth.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Standings;
