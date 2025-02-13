import { Major_Mono_Display } from "next/font/google";

const majormono = Major_Mono_Display({
    weight: '400',
    subsets: ['latin']
});

export default function Logo() {
  return (
    <div
      className={`${majormono.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[32px]">Nightly</p>
    </div>
  );
}
