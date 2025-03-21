import { auth } from "nglty/server/auth";
import { HydrateClient } from "nglty/trpc/server";
import { SignInScreen } from "../components/general/signin-screen";
import { ActionsBento } from "nglty/components/general/actions-bento";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main>
      { session?.user ? 
      (
        <section className="min-h-screen">
          {/* <div className="md:ml-12 md:mr-12 lg:mr-36 lg:ml-36 xl:mr-72 xl:mb-72 2xl:ml-128 2xl:mr-128"> */}
          <div>
          <ActionsBento session={session}/>
          </div>
        </section>
  ): <SignInScreen />}
    </main>
    </HydrateClient>
  );
}
