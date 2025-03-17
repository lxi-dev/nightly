import LogoCubicle from "../elements/logo/logo-cubicle";
import Search from "../elements/search";
import { PageNavLinks } from "./navlinks";

export const Header = async () => {

  return (
    <nav>
    <div className="flex flex-row items-center justify-between gap-4 pt-2 pb-2 bg-gray-200 dark:bg-gray-800">
        <div id="logo" className="pl-2">
            <LogoCubicle />
        </div>
        <div id="search" className="w-72">

            <Search />
        </div>
        <div id="menu" className="pr-2">
            <PageNavLinks />
        
            {/* <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
            </p>
*/}
        </div>

    </div>
    <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
    </nav>
  );
};