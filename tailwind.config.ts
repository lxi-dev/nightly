import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        'aurora-200': '#01cbae',
        'aurora-300': '#2082a6',
        'aurora-400': '#524096',
        'aurora-500': '#5f2a84',
        'aurora-600': '#13FFAA',
        'aurora-700': '#1E67C6',
        'aurora-800': '#CEB4CF',
        'aurora-900': '#DD335C',
        'aurora': '#0C0E0C',
      }
    },
  },
  plugins: [],
} satisfies Config;
