import { type FunctionComponent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

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
                    {/* <Sparkles className="text-[#6B73FF] dark:text-[#65FDF0]" /> */}
                        Digital-Hunt 
                    </div>
                    </h1>
                    <div className="flex flex-col md:flex-row gap-2 mb-6 pt-3">
                        {/* <WorkshopForm user={user} />
                        <Button className="dark:bg-white dark:text-black">
                            <Link href='/profile'>
                                Register to Contest 
                            </Link>
                        </Button> */}
                    </div>
                </div>
                <div className="mt-12 w-full flex flex-col items-center gap-5 text-center mb-4 px-2 shadow-custom py-3 ">
                    <h1 className="text-2xl font-semibold text-green-300 px-2">Champions Corner: Dive into the Leaderboard</h1>
                    <Link className="text-white text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                        href={"/leaderboard"} rel="noopener noreferrer" target="_blank" onClick={() => {console.log("leaderboard")}}>
                        View Leaderboard 🏆
                    </Link>

                    <div className="text-white bg-gradient-to-tl backdrop-blur-md w-full md:w-3/4 border border-sky-300 rounded-lg p-4">
                        <h2 className="text-lg md:text-xl font-semibold text-green-400 mb-2">Instructions to play</h2>
                        {/* <h2 className="font-semibold text-lg md:text-xl text-yellow-400 mb-2">Generative AI workshop</h2> */}
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
                <div className="mt-4 flex flex-col items-center gap-5 text-center mb-4 px-2">
                    <h1 className="text-2xl font-semibold text-green-300 px-2">Round 1 Storyline</h1>
                    <Link className="text-white text-md bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br ring-green-900 ring-4 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                        href={"/leaderboard"} rel="noopener noreferrer" target="_blank" onClick={() => {console.log("leaderboard")}}>
                        View Leaderboard 🏆
                    </Link>

                    <div className="text-white bg-gradient-to-tl backdrop-blur-md w-full md:w-3/4 border border-sky-300 rounded-lg p-4">
                        <h2 className="text-lg md:text-xl font-semibold text-green-400 mb-2">Instructions to play</h2>
                        {/* <h2 className="font-semibold text-lg md:text-xl text-yellow-400 mb-2">Generative AI workshop</h2> */}
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
                {/* Champions Corner: Dive into the Leaderboard */}
                    {/* <button className="bg-black rounded-lg shadow-lg text-white px-4 py-2"
                        onClick={() => signIn("google")}>Sign in
                    </button> */}
            </main>
        </>
    )
}

export default SignPage;