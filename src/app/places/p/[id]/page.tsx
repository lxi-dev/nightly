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
  // const data = await api.happening.getById({id});
  // const posts = await api.happening.getPostsByHappening({happeningId: id})
  const session = await auth();

  return (
    <HydrateClient>
        <main className={`${!session ? 'blur-sm' : ''}min-h-screen`}>
          <div className="md:ml-12 md:mr-12 lg:mr-72 lg:ml-72 2xl:ml-128 2xl:mr-128">

            <PlaceProfile userId={session?.user.id} id={id}/>
          </div>
      </main>
    </HydrateClient>
  );
}