import type { Happening } from "@prisma/client";
import VaListItem from "./va-list-item";
import { useEffect, useState } from "react";
import { api } from "nglty/trpc/react";
import { useLoading } from "nglty/contexts/loadingContext";

type Props = {
    happenings?: Happening[];
    deletable?: boolean;
}

export const HappeningsList: React.FC<Props> = ({ happenings, deletable }) => {
    const [list, setList] = useState<Happening[] | undefined>(undefined);

    const deleteHappening = api.happening.deleteHappening.useMutation({});
    const {showLoading, hideLoading} = useLoading();

    const handleDelete = async (happeningId: string) => {
        if(!happeningId) return;
        showLoading();
        try {
            const dlt = await deleteHappening.mutateAsync(happeningId);

            if (dlt) {
                const newList = list?.filter((e) => e.id !== happeningId);
                setList(newList);
            }
        } catch (error) {
            console.error("Error deleting happening:", error);
        } finally {
            hideLoading();
        }
    }

    const onDelete = async (e: string) => {
        await handleDelete(e);
    }

    useEffect(() => {
        setList(happenings)
    }, [happenings])
    return (
        <section>
            { !happenings && <span>Loading...</span>}
            { happenings && list && 
                <div className="flex flex-col gap-4">
                {list.map(
                (happening, i) => <VaListItem 
                    happeningId={happening.id} 
                    key={i} 
                    happeningStatus={happening.type}
                    happeningName={happening.name} 
                    happeningVenue={happening.venue ?? ''} 
                    happeningStart={happening.dateHappening?.toString() ?? ''} 
                    color={happening.color}
                    venueId={happening.venueId ?? undefined}
                    onDelete={deletable ? onDelete : undefined}/>)}
                 </div>
            }
        </section>
    );
}