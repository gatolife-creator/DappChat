import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost no-animation normal-case text-xl">
          KUChat
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/contacts">Chat</Link>
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
