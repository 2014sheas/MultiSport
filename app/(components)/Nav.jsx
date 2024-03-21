import { faHome, faTicket, faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/standings/">
          <FontAwesomeIcon icon={faListOl} className="icon" />
        </Link>
        <Link href="/admin/">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div>
        <p className="text-default-text">2014shea.s@gmail.com</p>
      </div>
    </nav>
  );
};

export default Nav;
