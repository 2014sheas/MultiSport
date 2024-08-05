import BtnResetPlayers from "../(components)/players/BtnResetPlayers";
import BtnResetTeams from "../(components)/teams/BtnResetTeams";
import EditDropdown from "../(components)/EditDropdown";
import CreateUser from "../(components)/userManagement/CreateUser";
import BtnUpdatePoints from "../(components)/events/tournament/BtnUpdatePoints";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import UploadForm from "../(components)/uploads/UploadForm";

const BASE_URL = process.env.BASE_URL;

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players`, {
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

  const session = await getSession();
  const user = session?.user;
  const userRoles = user?.["https://multisport.games/roles"];

  return (
    <div>
      <EditDropdown editType={"event"} list={events} />
      <EditDropdown editType={"team"} list={teams} />
      <EditDropdown editType={"player"} list={players} />
      {userRoles?.includes("commish") && <BtnResetTeams />}
      <br />
      {userRoles?.includes("commish") && <BtnResetPlayers />}
      <br />
      <br />
      <BtnUpdatePoints />
      <br />
      <Link href="/admin/eventEdit/new">
        <button className="btn w-fit text-white">Add New Event</button>
      </Link>
      <br />
      <br />
      <Link href="/admin/teamEdit/new">
        <button className="btn w-fit text-white">Add New Team</button>
      </Link>
      <br />
      <br />
      <Link href="/admin/playerEdit/new">
        <button className="btn w-fit text-white">Add New Player</button>
      </Link>
      <br />
      <br />
      <UploadForm />
      <br />
      <br />
    </div>
  );
};

export default withPageAuthRequired(AdminPage, {
  returnTo: "/",
});
