import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { caller } from "@/trpc/server";


const Home = async () => {
  const greeting = await caller.hello({ text: "from tRPC Server" }); 

  const session = await auth.api.getSession({
    headers: await headers(),
  }) 

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div>
      <p>{greeting.greeting}</p>
      <HomeView />
    </div>
  )
}

export default Home;
