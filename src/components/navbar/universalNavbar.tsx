import { useSession, signOut } from "next-auth/react";
import { LogOut, ChevronDown } from "lucide-react";
import Navbar from ".";
import { useRouter } from "next/router";
import Link from "next/link";

const UniNavbar = () => {
  const user = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-out or redirection failed", error);
    }
  };

  const router = useRouter();
  const noNavbar = ["/leaderboard", "/round1", "/round2"];

  return (
    <>
      {!noNavbar.includes(router.pathname) && user.data && (
        <div className="group absolute left-1/2 z-50 mx-auto flex h-10 w-20 -translate-x-1/2 items-center justify-center rounded-b-3xl bg-gray-400/25 text-sm md:text-base">
          <ChevronDown color="rgb(107, 114, 128)" />
          <nav className="absolute -top-[200%] left-1/2 flex h-[200%] w-fit -translate-x-1/2 justify-center gap-2 overflow-visible px-6 py-3 backdrop-blur-md transition-all duration-300 ease-linear group-hover:top-0">
            <button
              className="my-3 flex shrink-0 items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
              onClick={() => handleSignOut()}
            >
              Sign Out <LogOut size={20} />
            </button>
            <Link
              href={"/round1"}
              target="_blank"
              className="my-3 flex shrink-0 items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
            >
              Round 1
            </Link>
            <Link
              className="my-3 flex shrink-0 items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
              href={"/round2"}
              target="_blank"
            >
              Round 2
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default UniNavbar;
