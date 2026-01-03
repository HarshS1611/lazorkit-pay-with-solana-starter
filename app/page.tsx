import { ConnectButton } from "@/components/ConnectButton";
import { PayWithSolana } from "@/components/PayWithSolana";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">
        Lazorkit Pay with Solana Starter
      </h1>

      <ConnectButton />
      <PayWithSolana />
    </main>
  );
}
