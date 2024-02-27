import BtnResetPlayers from "../(components)/players/BtnResetPlayers";
import BtnResetTeams from "../(components)/teams/BtnResetTeams";
import EditDropdown from "../(components)/EditDropdown";

const getEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Events", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Teams", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Players", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};

const AdminPage = async () => {
  const events = await getEvents();
  const teams = await getTeams();
  const players = await getPlayers();

  return (
    <div>
      <EditDropdown editType={"event"} list={events} />
      <EditDropdown editType={"team"} list={teams} />
      <EditDropdown editType={"player"} list={players} />
      <BtnResetTeams />
      <br />
      <BtnResetPlayers />
    </div>
  );
};

export default AdminPage;
