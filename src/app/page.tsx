import { auth } from "nglty/server/auth";
import { HydrateClient } from "nglty/trpc/server";
import { SignInScreen } from "../components/signin-screen";
import { Header } from "nglty/components/ui/header";
import { ActionsBento } from "nglty/components/ui/actions-bento";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main>
      { session?.user ? 
      (
        <section className="dark:bg-black">
          <Header />
          <div className="lg:ml-12 lg:mr-12 2xl:ml-72 2xl:mr-72">
          <ActionsBento session={session}/>
          </div>
        </section>
  ): <SignInScreen />}
    </main>
    </HydrateClient>
  );
}
