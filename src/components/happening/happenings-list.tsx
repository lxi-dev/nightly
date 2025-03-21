import type { Happening } from "@prisma/client";
import VaListItem from "./va-list-item";

type Props = {
    happenings?: Happening[];
}

export const HappeningsList: React.FC<Props> = ({ happenings  }) => {

    return (
        <section>
            { !happenings && <span>Loading...</span>}
            { happenings && 
                <div className="flex flex-col gap-4">
                {happenings.map(
                (happening, i) => <VaListItem 
                    happeningId={happening.id} 
                    key={i} 
                    happeningStatus={happening.type}
                    happeningName={happening.name} 
                    happeningVenue={happening.venue ?? ''} 
                    happeningStart={happening.dateHappening?.toString() ?? ''} 
                    color={happening.color}/>)}
                 </div>
            }
        </section>
    );
}