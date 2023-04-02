import Link from "next/link";
import { useWallet } from "../hooks/useWallet";
import Avatar from "boring-avatars";

const Navbar = () => {
  const { currentAccount } = useWallet();
  return (
    <nav className="fixed top-0 left-0 navbar bg-transparent z-[9999]">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost no-animation normal-case text-xl"
        >
          KUChat
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="">
              Wallet: {currentAccount?.slice(0, 6)}...
              {currentAccount?.slice(-4)}
            </Link>
          </li>
          <li>
            <Link href="/chat">Chat</Link>
          </li>
        </ul>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Avatar size={40} name={currentAccount} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
