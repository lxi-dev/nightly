import LogoCubicle from "../elements/logo/logo-cubicle";
import { PageNavLinks } from "./navlinks";

export const Header = async () => {

  return (
    <div className="flex flex-row items-center justify-between gap-4 pt-2 pb-2 light:bg-gray-200 dark:bg-gray-800">
        <div id="logo" className="pl-2">
            <LogoCubicle />
        </div>
        <div id="menu" className="pr-2">
            <PageNavLinks />
        
            {/* <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
            </p>
*/}
        </div>
    </div>
  );
};