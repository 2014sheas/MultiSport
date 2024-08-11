import Nav from "./(components)/Nav";
import NavMobile from "./(components)/Nav";
import "./globals.css";
import { Inter } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const BASE_URL = process.env.BASE_URL;

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MultiSport",
  description: "Multisport website, Generated by Stephen Shea",
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

const RootLayout = async ({ children }) => {
  const players = await getPlayers();
  console.log("in RootLayout");
  console.log(players);
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <div className="hidden md:block  bg-nav text-white">
              <Nav players={players} />
            </div>
            <div className="overflow-y-auto bg-page text-default-text h-full w-full">
              {children}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="fixed md:hidden bottom-0 left-0 z-50 w-full bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <NavMobile players={players} />
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
};

export default RootLayout;
