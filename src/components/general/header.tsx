import Search from "../elements/search";
import { PageNavLinks } from "./navlinks";
import { AurorasBackground } from "../backgrounds/auroras";
import LogoCubicle from "../elements/logo/logo-cubicle";
import { auth } from "nglty/server/auth";
import GenericNotification from "../elements/notification-pills/generic";

export const Header = async () => {

  const session = await auth();
  const role = session?.user.role;

  return (
    <nav>
        <header className="relative border-b sticky top-0 z-10 bg-background/95 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-violet-700/30 to-teal-500/30"> </div>
          <AurorasBackground />
        </div>

        <div className="container relative z-10 flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-8">
            <a href="/">
            <div className="font-semibold text-xl flex items-center space-x-2">
                <LogoCubicle />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-700">
                    Nightly
                </span>
                {role === 'admin' && <GenericNotification text="admin" />}
            </div>
            </a>
            <div className="relative hidden md:block">
                <Search />
            </div>
        </div>
        <div className="flex items-center">
            <PageNavLinks role={role!}/>
        </div>
        </div>
        </header>
      </nav>
  );
};