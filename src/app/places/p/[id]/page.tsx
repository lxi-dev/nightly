import { Header } from 'nglty/components/ui/header';
import PlaceProfile from 'nglty/components/ui/place-page';
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
        <main className={`${!session ? 'blur-sm' : ''} dark:bg-black`}>
            <Header />
          <div className="lg:ml-12 lg:mr-12">

            <PlaceProfile id={id}/>
          </div>
      </main>
    </HydrateClient>
  );
}