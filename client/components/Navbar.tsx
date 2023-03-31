import Link from "next/link";
import { useWallet } from "../hooks/useWallet";

const Navbar = () => {
  const { currentAccount } = useWallet();
  return (
    <nav className="fixed top-0 left-0 navbar bg-transparent">
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
            <Link href="#">
              Wallet: {currentAccount?.slice(0, 6)}...
              {currentAccount?.slice(-4)}
            </Link>
          </li>
          <li>
            <Link href="/chat">Chat</Link>
          </li>
          <li>
            <Link href="/">Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
