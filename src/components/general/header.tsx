// import { Sparkles } from "lucide-react";
// import LogoCubicle from "../elements/logo/logo-cubicle";
import Search from "../elements/search";
import { PageNavLinks } from "./navlinks";
import { AurorasBackground } from "../backgrounds/auroras";
import LogoCubicle from "../elements/logo/logo-cubicle";

export const Header = async () => {

// Animated background dots
// function AnimatedDots() {
//     return (
//       <div className="absolute inset-0">
//         {Array.from({ length: 50 }).map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-primary/20"
//             style={{
//               width: `${Math.random() * 8 + 2}px`,
//               height: `${Math.random() * 8 + 2}px`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animation: `float ${Math.random() * 10 + 10}s linear infinite`,
//               animationDelay: `${Math.random() * 5}s`,
//               opacity: Math.random() * 0.5 + 0.2,
//             }}
//           />
//         ))}
//       </div>
//     )
//   }
  

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
            </div>
            </a>
            <div className="relative hidden md:block w-80">
                <Search />
            </div>
        </div>
        <div className="flex items-center">
            <PageNavLinks />
        </div>
        </div>
        </header>
      </nav>
  );
};