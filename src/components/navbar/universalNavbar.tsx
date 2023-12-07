import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
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
    <div className="group fixed top-0 z-50 flex h-20 w-full">
      {!noNavbar.includes(router.pathname) ? (
        user.data ? (
          <nav className="hidden h-full w-full justify-center gap-2 px-6 py-3 backdrop-blur-md group-hover:flex">
            <button
              className="my-3 flex items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
              onClick={() => handleSignOut()}
            >
              Sign Out <LogOut />
            </button>
            <Link
              href={"/round1"}
              target="_blank"
              className="my-3 flex items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
            >
              Round 1
            </Link>
            <Link
              className="my-3 flex items-center justify-center gap-2 rounded-[50px] bg-black px-4 py-3 text-white shadow-lg"
              href={"/round2"}
              target="_blank"
            >
              Round 2
            </Link>
          </nav>
        ) : (
          <Navbar />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default UniNavbar;
