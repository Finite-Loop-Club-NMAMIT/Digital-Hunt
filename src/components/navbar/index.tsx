import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavItems = [
  {
    name: "Instructions",
    href: "/#instructions",
  },
  {
    name: "Storyline",
    href: "/#storyline",
  },
  {
    name: "Team",
    href: "/#team",
  },
];

const Navbar: React.FC = () => {
  return (
    <>
      <section className="fixed top-0 z-50 hidden w-full justify-between px-6 py-3 text-white backdrop-blur-md md:flex ">
        <Link href="/">
          <div className="flex items-center space-x-4">
            <img
              src="/assets/flc_logo_crop.png"
              alt="logo"
              className="h-16 w-16"
            />
            <h3 className="text-2xl ">Finite Loop Club</h3>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            {NavItems.map((item, key) => (
              <li key={key} className="text-xl">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>

          <Link
            className="rounded-xl bg-[#2ccb66] p-2 text-white duration-200 hover:scale-105"
            href={"/leaderboard"}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => {
              console.log("leaderboard");
            }}
          >
            Leaderboard
          </Link>
        </div>
      </section>

      <div className="fixed top-0 z-50 flex w-full px-4 backdrop-blur-lg md:hidden">
        <div className="flex">
          <div className="pt-2">
            <Link href="/">
              <img
                src="/assets/flc_logo_crop.png"
                className=" w-16"
                alt="logo "
              />
            </Link>
          </div>
        </div>
        <nav>
          <div id="menuToggle" className=" pr-4 pt-6">
            <input type="checkbox" />
            <span className="bg-white"></span>
            <span className="bg-white"></span>
            <span className="bg-white"></span>

            <ul
              id="menu"
              className=" glass-panel z-50 w-[60vw] space-y-6 bg-opacity-5 pr-4 text-right shadow-[#2ccb66] drop-shadow-xl"
            >
              {NavItems.map((item, key) => (
                <li key={key} className="text-xl">
                  <Link href={item.href} className="text-2xl text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="rounded-xl bg-[#2ccb66] p-2 text-white duration-200 hover:scale-105"
                  href={"/leaderboard"}
                  rel="noopener noreferrer"
                  target="_blank"
                  onClick={() => {
                    console.log("leaderboard");
                  }}
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
