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
        <section>
          <Header />
          <ActionsBento user={session.user}/>
        </section>
  ): <SignInScreen />}
    </main>
    </HydrateClient>
  );
}
