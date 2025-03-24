import { SessionProvider } from 'next-auth/react';
import EventPage from 'nglty/components/happening/happening_v2';
import { auth } from 'nglty/server/auth';
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
  const posts = await api.happening.getPostsByHappening({happeningId: id})
  const session = await auth();
  const followers = await api.happening.getFollowing({happeningId: id});
  return (
    <HydrateClient>
      <SessionProvider>

        <main className={`${!data ? 'blur-sm' : ''}`}>
            { !data && <div>Happening nicht gefunden</div>}
            <div>

            <EventPage event={data} userId={session?.user.id} posts={posts} followers={followers}/>
            {/*<HappeningView data={data} session={session} posts={posts}/> */}
          </div>
      </main>
          </SessionProvider>
    </HydrateClient>
  );
}