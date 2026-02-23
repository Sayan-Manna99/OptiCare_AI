import Link from "next/link";
import NavItems from "./auth/NavItems";
import UserDropdown from "./auth/UserDropdown";
function Header({ user }: { user: User }) {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" /></svg>
          </div>
          <span className="text-sm font-bold text-gray-200 leading-tight group-hover:text-blue-400 transition-colors hidden sm:block">
            AI Eye Disease<br />
            <span className="text-xs font-medium text-gray-500">Prediction System</span>
          </span>
        </Link>
        <nav className="hidden md:block">
          <NavItems />
        </nav>
        <UserDropdown user={user} />
      </div>
    </header>
  );
}

export default Header;
