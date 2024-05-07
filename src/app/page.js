import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home(){
  return(
    <main className="min-h-screen bg-neutral-900 text-neutral-200 flex justify-center items-center p-3">
      <div className="block space-y-12">
        <h1 className="text-center text-3xl">Welcome to our own Books-Management-Website 📚</h1>
        <div>
          <Link href={"/auth"}>
            <Button variant="outline">Get Started</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}