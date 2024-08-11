const BASE_URL = process.env.BASE_URL;

const getTeams = async () => {
  try {
    const res = await fetch(`/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const getEvents = async () => {
  try {
    const res = await fetch(`/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const updateTeam = async (team) => {
  const formData = team;

  const res = await fetch(`/api/Teams/${team._id}`, {
    method: "PUT",
    body: JSON.stringify({ formData }),
    "Content-Type": "application/json",
  });
  if (!res.ok) {
    throw new Error("Failed to update team" + res.status);
  }
};

const updatePoints = async () => {
  const events = await getEvents();
  const teams = await getTeams();

  const teamIds = teams.map((team) => team.teamId);
  let teamPoints = teams.map((team) => {
    return {
      teamId: team.teamId,
      points: 0,
      first: [],
      second: [],
      third: [],
      fourth: [],
      fifth: [],
      sixth: [],
      seventh: [],
      eighth: [],
    };
  });

  const mapIndexTournament = {
    0: "first",
    1: "second",
    2: "third",
    3: "fourth",
    4: "fifth",
    5: "fifth",
    6: "seventh",
    7: "seventh",
  };

  const mapIndexScored = {
    0: "first",
    1: "second",
    2: "third",
    3: "fourth",
    4: "fifth",
    5: "sixth",
    6: "seventh",
    7: "eighth",
  };

  const mapIndexTournament4 = {
    0: "first",
    1: "first",
    2: "second",
    3: "second",
    4: "third",
    5: "third",
    6: "fourth",
    7: "fourth",
  };

  events.forEach((event) => {
    if (event.status === "Completed") {
      let validResults = true;
      if (
        event.results.length !== event.pointsArray.length ||
        new Set(event.results).size !== event.results.length ||
        !event.results.every((team) => teamIds.includes(team))
      ) {
        validResults = false;
      }

      if (!validResults) {
        console.log("Invalid results");
      }
      event.results.forEach((result, index) => {
        const team = teamPoints.find((team) => team.teamId === result);
        team.points += event.pointsArray[index];

        switch (event.eventType) {
          case "Tournament":
            team[mapIndexTournament[index]].push(event.eventId);
            break;
          case "Bolwing":
            team[mapIndexScored[index]].push(event.eventId);
            break;
          case "Softball":
            team[mapIndexScored[index]].push(event.eventId);
            break;
          case "Relay":
            team[mapIndexScored[index]].push(event.eventId);
            break;
          case "Tournament4":
            team[mapIndexTournament4[index]].push(event.eventId);
            break;
          default:
            break;
        }
      });
    } else {
    }
  });

  teams.forEach((team) => {
    const teamData = teamPoints.find(
      (teamPoint) => teamPoint.teamId === team.teamId
    );

    console.log(teamData);
    team.first = teamData.first;
    team.second = teamData.second;
    team.third = teamData.third;
    team.fourth = teamData.fourth;
    team.fifth = teamData.fifth;
    team.sixth = teamData.sixth;
    team.seventh = teamData.seventh;
    team.eighth = teamData.eighth;
    team.totalPoints = teamData.points;

    updateTeam(team);
  });
};

export default updatePoints;
