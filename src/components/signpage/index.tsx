import { type FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "../imageslider";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import BlurImage from "../blurImage";
import { signIn } from "next-auth/react";
import Navbar from "../navbar";

const members = [
  {
    img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1675567338/core-team-uploads/gmfblohgksgpm0eudvr4.jpg",
    name: "Nidheesha T",
    linkedin: "https://www.linkedin.com/in/nidheesha-t-8b6685246/",
    github: "https://github.com/NidheeshaT",
  },
  {
    img: "https://res.cloudinary.com/dg7etzwks/image/upload/v1701168215/extras/nsprofile_keerthan.jpg",
    name: "Keerthan NS",
    linkedin: "https://www.linkedin.com/in/keerthan-n-s-220142208/",
    github: "https://github.com/keerthan-ns",
  },
  {
    img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1697642130/core-team-uploads/ht6owgzjtxt98lzlco1n.jpg",
    name: "Nandan R Pai",
    linkedin: "https://www.linkedin.com/in/nandanpai09",
    github: "https://github.com/nandanpi",
  },
  {
    img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1696951101/core-team-uploads/deaaekx6ayukmaq75q7j.jpg",
    name: "Srivatsa R Upadhya",
    linkedin: "https://www.linkedin.com/in/srivatsa-r-upadhya-060373227/",
    github: "https://github.com/SrivatsaRUpadhya/",
  },
  {
    img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1675567322/core-team-uploads/hef3xncibdxghrcw3ao5.png",
    name: "Nagaraj Pandith",
    linkedin: "https://www.linkedin.com/in/nagaraj-pandith/",
    github: "https://github.com/nagarajpandith",
  },
];

const images = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
];

const SignPage: FunctionComponent = () => {
  return (
    <>
      <nav className="w-screen">
        <Navbar />
      </nav>
      <main className="max-w-screen flex h-auto flex-col items-center justify-center gap-4 bg-black">
        <div className="shadow-custom flex min-h-screen w-full flex-col items-center justify-center bg-[url('/assets/mainbg.jpeg')] bg-cover bg-center py-20 text-center ">
          {/* <Image
            src={"/assets/flc_logo.png"}
            alt="flc logo"
            height={300}
            width={400}
            className="mb-14"
          /> */}
          <h1 className="px-2 text-4xl font-bold text-white">
            Finite Loop Club presents
          </h1>

          <h1 className="title mb-2 flex text-4xl font-bold md:text-5xl">
            <div className="neonText my-8 text-5xl  tracking-wide">
              Digital-Hunt
            </div>
          </h1>

          <h2 className="text-3xl text-white">
            Read instructions before you start to play
          </h2>

          <div className="absolute bottom-4 animate-bounce ">
            <Link href="/#instructions">
              <svg
                width="50"
                height="50"
                viewBox="0 0 74 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M65.2726 18.5L69.375 22.1445L37 55.5L4.625 22.1445L8.72738 18.5L37 47.6283L65.2726 18.5Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div
          className="shadow-custom mb-4 mt-12 flex w-full flex-col items-center gap-5 px-2 py-3 text-center "
          id="instructions"
        >
          <div className="mt-20 w-full space-y-6 rounded-lg border border-sky-300 bg-gradient-to-tl p-4 text-white backdrop-blur-md md:w-3/4">
            <h1 className="neonText px-2 text-3xl font-semibold">
              Instructions to play
            </h1>
            <ol className="mt-4text-gray-200 list-inside list-disc text-justify">
              <li>
                You need to sign in with a google account to start playing.
              </li>
              <li>
                There&apos;s no guide to help you on `what needs to be done
                next?`, that&apos;s what you have to figure out in this game.
              </li>
              <li>
                Advised to be played on a Desktop/Laptop computers, and not on
                Smartphones.
              </li>
              <li>Consists of total two rounds.</li>
              <li>
                You can submit the form any number of times, so keep filling the
                answers as you solve the puzzles.
              </li>
              <li>
                Each puzzle you solve fetches you a +20 and each hint you take
                will take -10 from you.
              </li>
              <li>
                Public leaderboard is available{" "}
                <a
                  href="https://intsagram.tech/leaderboard"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sky-600 underline-offset-1 hover:underline"
                >
                  [here]
                </a>
              </li>
              <li>Now, go ahead and find Obama&apos;s hacker</li>
            </ol>
          </div>

          <div className="mb-20 space-y-4">
            <p className="font-semibold text-white">
              Tip: Keep the Round 1 submission form open in a separate tab
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                className="text-md mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                onClick={() => signIn("google")}
              >
                SignIn to continue 🏁
              </button>
              <Link
                className="text-md mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center font-normal text-white shadow-lg shadow-green-800/80 ring-4 ring-green-900 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                href={"/round1"}
                rel="noopener noreferrer"
                target="_blank"
                onClick={() => {
                  console.log("round1 form");
                }}
              >
                Round 1 Submission
              </Link>
            </div>
          </div>
        </div>

        <div className="shadow-custom w-full space-y-12 py-20">
          <h1 className="neonText px-2 text-3xl font-semibold">
            Round 1 Storyline
          </h1>
          <div className="flex justify-center">
            <ImageSlider propsImages={images} />
          </div>{" "}
        </div>

        <div
          className="my-16 flex w-full flex-col items-center gap-5 px-2 pb-3 text-center"
          id="team"
        >
          <h1 className="neonText my-6 px-2 text-3xl font-semibold">
            Meet the puzzle building team
          </h1>
          <div className="mt-10 flex w-full flex-wrap justify-center gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="rounded-3xl border border-green-500 p-3 shadow-[5px_11px_15px_rgba(41,_247,_74,_0.7)] sm:p-3 lg:px-4"
              >
                <div className="flex flex-col">
                  <div className="mx-auto transition duration-500 hover:scale-[1.03]">
                    <BlurImage
                      className="rounded-2xl object-cover drop-shadow-md transition-all delay-100 duration-200 hover:drop-shadow-2xl"
                      src={member.img}
                      width={220}
                      height={220}
                      alt={member.name}
                      style={{ objectFit: "cover", height: "220px" }}
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h1 className="mb-1 text-xl font-bold text-gray-200">
                      {member.name}
                    </h1>
                    <div
                      className="flex items-center justify-center text-white opacity-50
                                        transition-opacity duration-300 hover:opacity-100"
                    >
                      {member.linkedin && (
                        <Link
                          passHref
                          href={member.linkedin}
                          className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-indigo-50 hover:text-blue-700"
                          target="_blank"
                        >
                          <AiFillLinkedin className="text-2xl" />
                        </Link>
                      )}

                      {member.github && (
                        <Link
                          passHref
                          href={member.github}
                          className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-gray-50 hover:text-black"
                          target="_blank"
                        >
                          <AiFillGithub className="text-2xl" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default SignPage;
