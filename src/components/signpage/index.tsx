import { type FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "../imageslider";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import BlurImage from "../blurImage";

const members = [
    {
      img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1675567338/core-team-uploads/gmfblohgksgpm0eudvr4.jpg",
      name: "Nidheesha T",
      linkedin: "https://www.linkedin.com/in/nidheesha-t-8b6685246/",
      github: "https://github.com/NidheeshaT"
    },
    {
      img: "https://res.cloudinary.com/dg7etzwks/image/upload/v1701168215/extras/nsprofile_keerthan.jpg",
      name: "Keerthan NS",
      linkedin: "https://www.linkedin.com/in/keerthan-n-s-220142208/",
      github: "https://github.com/keerthan-ns"
    },
    {
      img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1675567322/core-team-uploads/hef3xncibdxghrcw3ao5.png",
      name: "Nagaraj Pandith",
      linkedin: "https://www.linkedin.com/in/nagaraj-pandith/",
      github: "https://github.com/nagarajpandith"
    },
    {
      img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1697642130/core-team-uploads/ht6owgzjtxt98lzlco1n.jpg",
      name: "Nandan R Pai",
      linkedin: "https://www.linkedin.com/in/nandanpai09",
      github: "https://github.com/nandanpi"
    },
    {
      img: "https://res.cloudinary.com/dwfiisxz0/image/upload/v1696951101/core-team-uploads/deaaekx6ayukmaq75q7j.jpg",
      name: "Srivatsa R Upadhya",
      linkedin: "https://www.linkedin.com/in/srivatsa-r-upadhya-060373227/",
      github: "https://github.com/SrivatsaRUpadhya/"
    }
];

const SignPage: FunctionComponent = () => {
    return (
        <>
            <main className="max-w-screen h-auto flex flex-col justify-center items-center gap-4 bg-black">
                <div className="flex flex-col justify-center items-center text-center w-full min-h-screen bg-[url('/assets/mainbg.jpeg')] bg-cover bg-center py-20 shadow-custom">
                    {/* <Image src={"/assets/flclogo.png"} alt="flc logo" height={100} width={100} className="mb-14"/> */}
                    <Image src={"/assets/flc_logo.png"} alt="flc logo" height={300} width={400} className="mb-14"/>
                    <h1 className="text-3xl font-bold text-white px-2">Finite Loop Club presents</h1>
                    <h1 className="flex text-4xl md:text-5xl font-bold title mb-2">
                    <div className="text-5xl tracking-wide neonText">
                        Digital-Hunt 
                    </div>
                    </h1>
                </div>
                <div className="mt-12 w-full flex flex-col items-center gap-5 text-center mb-4 px-2 shadow-custom py-3 ">
                    <h1 className="text-3xl font-semibold neonText px-2">Champions Corner: Dive into the Leaderboard</h1>
                    <Link className="text-white text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                        href={"/leaderboard"} rel="noopener noreferrer" target="_blank" onClick={() => {console.log("leaderboard")}}>
                        View Leaderboard 🏆
                    </Link>

                    <div className="text-white bg-gradient-to-tl backdrop-blur-md w-full md:w-3/4 border border-sky-300 rounded-lg p-4">
                        <h2 className="text-lg md:text-xl font-semibold text-green-400 mb-2">Instructions to play</h2>
                        <ol className="list-disc list-inside mt-4text-gray-200 text-justify">
                            <li>You need to sign in with a google account to start playing.</li>
                            <li>There&apos;s no guide to help you on `what needs to be done next?`, that&apos;s what you have to figure out in this game.</li>
                            <li>Advised to be played on a Desktop/Laptop computers, and not on Smartphones.</li>
                            <li>Consists of total two rounds.</li>
                            <li>You can submit the form any number of times, so keep filling the answers as you solve the puzzles.</li>
                            <li>Each puzzle you solve fetches you a +20 and each hint you take will take -10 from you.</li>
                            <li>Public leaderboard is available {' '}
                                <a href="https://intsagram.tech/leaderboard" rel="noopener noreferrer" target="_blank" className="text-sky-600 hover:underline underline-offset-1">[here]</a>
                            </li>
                            <li>Now, go ahead and find Obama&apos;s hacker</li>
                        </ol>
                    </div>
                </div>
                <div className="mt-4 w-full flex flex-col items-center gap-5 text-center mb-4 px-2 shadow-custom pb-3">
                    <h1 className="text-3xl font-semibold neonText px-2">Round 1 Storyline</h1>
                    <ImageSlider />
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        <button className="text-white font-normal text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => {console.log("signin")}}>
                            SignIn to continue 🏁
                        </button>
                        <Link className="text-white font-normal text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                            href={"/round1"} rel="noopener noreferrer" target="_blank" onClick={() => {console.log("round1 form")}}>
                            Round 1 Submission
                        </Link>
                    </div>
                </div>
                <div className="mt-4 w-full flex flex-col items-center gap-5 text-center mb-4 px-2 pb-3">
                    {/* <h1 className="text-3xl font-semibold text-green-300 px-2">Meet the puzzle building team</h1> */}
                    <h1 className="text-3xl font-semibold neonText px-2">Meet the puzzle building team</h1>
                    <div className="mt-10 w-full flex flex-wrap justify-center gap-8">
                    {
                        members.map((member, index) =>
                            <div key={index} className="p-3 sm:p-3 lg:px-4 border border-green-500 rounded-3xl shadow-[5px_11px_15px_rgba(41,_247,_74,_0.7)]">
                                    <div className="flex flex-col">
                                      <div className="mx-auto transition duration-500 hover:scale-[1.03]">
                                        <BlurImage
                                          className="rounded-2xl object-cover drop-shadow-md transition-all delay-100 duration-200 hover:drop-shadow-2xl"
                                          src={member.img}
                                          width={350}
                                          height={350}
                                          alt={member.name}
                                          style={{ objectFit: "cover", height: "350px" }}
                                        />
                                      </div>
                                      <div className="mt-6 text-center">
                                        <h1 className="mb-1 text-xl font-bold text-gray-200">
                                          {member.name}
                                        </h1>
                                        <div
                                          className="flex items-center justify-center opacity-50 transition-opacity
                                        duration-300 hover:opacity-100 text-white"
                                        >
                                          {member.linkedin && (
                                            <Link
                                              passHref
                                              href={member.linkedin}
                                              className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-indigo-50 hover:text-blue-700"
                                            >
                                              <AiFillLinkedin className="text-2xl" />
                                            </Link>
                                          )}
              
                                          {member.github && (
                                            <Link
                                              passHref
                                              href={member.github}
                                              className="flex h-10 w-10  items-center justify-center rounded-full hover:bg-gray-50 hover:text-black"
                                            >
                                              <AiFillGithub className="text-2xl" />
                                            </Link>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              )
                    }
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignPage;
