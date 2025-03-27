import PlaceProfile from 'nglty/components/places/place-page';
import { auth } from 'nglty/server/auth';
import { HydrateClient } from 'nglty/trpc/server';
import React from "react";

type PlacePageParams = {
  id: string;
};

interface PlacePageProps {
  params: PlacePageParams;
  id: string;
}

export default async function Page({ params } : {params: Promise<PlacePageProps>}) {
  const { id } = await params;

  const session = await auth();

  return (
    <HydrateClient>
        <main className={`${!session ? 'blur-sm' : ''}min-h-screen`}>
          <PlaceProfile userId={session?.user.id} id={id}/>
      </main>
    </HydrateClient>
  );
}