import { SessionProvider } from 'next-auth/react';
import EventPage from 'nglty/components/happening/happening_v2';
// import { auth } from 'nglty/server/auth';
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
  // const posts = await api.happening.getPostsByHappening({happeningId: id})
  // const session = await auth();

  return (
    <HydrateClient>
      <SessionProvider>

        <main className={`${!data ? 'blur-sm' : ''}`}>
            { !data && <div>Happening nicht gefunden</div>}
            <div className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:ml-72 2xl:ml-128 2xl:mr-128">

            <EventPage event={data} />
            {/*<HappeningView data={data} session={session} posts={posts}/> */}
          </div>
      </main>
          </SessionProvider>
    </HydrateClient>
  );
}