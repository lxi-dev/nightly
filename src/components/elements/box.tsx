const bentoClass = "flex rounded-lg border-2 flex-col bg-gray-200 dark:bg-slate-900 dark:border-white/10 border-opacity-60"


export const BentoBox = ({ colSpan, rowSpan, children }: { colSpan: string, rowSpan: string, children: React.ReactNode }) => {
    return (
        <div 
            className={`${bentoClass} col-span-${colSpan} row-span-${rowSpan} hover:border-aurora-900`}
        >
            {children}
        </div>
    );
  };