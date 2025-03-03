import { HappeningView } from 'nglty/components/ui/happening';
import { Header } from 'nglty/components/ui/header';
import { auth } from 'nglty/server/auth';
import { api, HydrateClient } from 'nglty/trpc/server';
import React from "react";

type EventPageParams = {
  id: string;
};

interface EventPageProps {
  params: EventPageParams;
  id: string;
}

export default async function Page({ params } : {params: Promise<EventPageProps>}) {
  const { id } = await params;
  const data = await api.happening.getById({id});
  const posts = await api.happening.getPostsByHappening({happeningId: id})
  const session = await auth();

  return (
    <HydrateClient>
        <main className={`${!data ? 'blur-sm' : ''} dark:bg-black`}>
            <Header />
            { !data && <div>Happening nicht gefunden</div>}
          <div className="lg:ml-12 lg:mr-12">

            <HappeningView data={data} session={session} posts={posts}/>
          </div>
      </main>
    </HydrateClient>
  );
}