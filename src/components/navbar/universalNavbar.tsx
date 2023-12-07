import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Navbar from ".";

const UniNavbar = () => {
  const { data: sessionData, status } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Sign-out or redirection failed", error);
    }
  };
  return (
    <div className="group fixed top-0 z-50 h-20 w-full">
      {useSession().data ? (
        <nav className="hidden h-full w-full justify-between px-6 py-3 backdrop-blur-md group-hover:flex">
          <button
            className="m-auto my-3 block rounded-[50px] bg-black px-4 py-2 text-white shadow-lg"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </button>
        </nav>
      ) : (
        <Navbar />
      )}
    </div>
  );
};

export default UniNavbar;
