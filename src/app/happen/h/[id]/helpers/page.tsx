import { SessionProvider } from 'next-auth/react';
import { HelpingHandsPage } from 'nglty/components/helpinghands/page';
import { HydrateClient } from 'nglty/trpc/server';
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

  return (
    <HydrateClient>
      <SessionProvider>

        <main>
            <div>
            <HelpingHandsPage happeningId={id} />
          </div>
      </main>
          </SessionProvider>
    </HydrateClient>
  );
}