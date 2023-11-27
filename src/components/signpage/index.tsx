import { type FunctionComponent } from "react";
import { signIn } from "next-auth/react";

const SignPage: FunctionComponent = () => {
    return (
        <>
            <main className="max-w-screen h-auto flex flex-col justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center text-center w-full min-h-screen bg-[url('/assets/mainbg.png')] bg-cover bg-center py-20 shadow-sm shadow-blue-300">
                    <h1 className="text-3xl font-bold text-white">Welcome to </h1>
                    <h1 className="flex text-4xl md:text-5xl font-bold title mb-2">
                    <div className="flex items-center gap-1 text-white">
                    {/* <Sparkles className="text-[#6B73FF] dark:text-[#65FDF0]" /> */}
                        GenReal 
                    </div>
                    <span className="ml-2 text-yellow-500 dark:text-yellow-400">
                        {' '}
                        by FLC
                    </span>
                    </h1>
                    <h3 className="text-md font-light dark:text-white mb-4">where AI ignites your storytelling genius </h3>
                    <div className="flex flex-col md:flex-row gap-2 mb-6 pt-3">
                        {/* <WorkshopForm user={user} />
                        <Button className="dark:bg-white dark:text-black">
                            <Link href='/profile'>
                                Register to Contest 
                            </Link>
                        </Button> */}
                    </div>
                </div>
                <div className="flex items-center gap-1 ">
                    {/* <Sparkles className="text-[#6B73FF] dark:text-[#65FDF0]" /> */}
                        GenReal 
                    </div>
                    {/* <button className="bg-black rounded-lg shadow-lg text-white px-4 py-2"
                        onClick={() => signIn("google")}>Sign in
                    </button> */}
            </main>
        </>
    )
}

export default SignPage;