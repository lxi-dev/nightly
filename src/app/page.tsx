import { auth } from "nglty/server/auth";
import { HydrateClient } from "nglty/trpc/server";
import { SignInScreen } from "../components/signin-screen";
import { Header } from "nglty/components/ui/header";
import { ActionsBento } from "nglty/components/ui/actions-bento";

export default async function Home() {
  //const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    //void api.post.getLatest.prefetch();
    console.log(session.user);
  }

  return (
    <HydrateClient>
      <main>
      { session?.user ? 
      (
        <section>
          <Header />
          <ActionsBento />
        </section>
  ): <SignInScreen />}
    </main>
    </HydrateClient>
  );
}
