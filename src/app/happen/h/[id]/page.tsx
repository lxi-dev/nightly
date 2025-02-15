import { HappeningView } from 'nglty/components/ui/happening';
import { Header } from 'nglty/components/ui/header';
import { api, HydrateClient } from 'nglty/trpc/server';
import React from "react";

type EventPageParams = {
  id: string;
};

interface EventPageProps {
  params: EventPageParams;
}

export default async function Page({ params } : EventPageProps) {
  const { id } = params;
  const data = await api.happening.getById({id});

  return (
    <HydrateClient>
        <main className={`${!data ? 'blur-sm' : ''}`}>
        
            <Header />
            { !data && <div>Happening nicht gefunden</div>}
            <HappeningView data={data}/>
      </main>
    </HydrateClient>
  );
}