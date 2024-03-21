import Standings from "../(components)/Standings";
const getTeams = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const StandingsPage = async () => {
  const teams = await getTeams();
  teams.sort((a, b) => b.totalPoints - a.totalPoints);
  return (
    <div>
      <Standings teams={teams} />
    </div>
  );
};

export default StandingsPage;
