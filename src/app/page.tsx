import { auth } from "nglty/server/auth";
import { HydrateClient } from "nglty/trpc/server";
import { SignInScreen } from "../components/general/signin-screen";
import { ActionsBento } from "nglty/components/general/actions-bento";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main>
      { session?.user 
        ? <ActionsBento/>
        : <SignInScreen />
      }
      </main>
    </HydrateClient>
  );
}
