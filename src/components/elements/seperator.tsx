export const Seperator = ({ text }: { text: string }) => {
  return (
<div className="relative flex w-2/3 items-center mt-8 mb-8">
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
      <span className="mx-4 text-neutral-500 dark:text-neutral-400 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-100"></div>
       </div>
  );
};