import { ConnectButton } from "@/components/ConnectButton";
import { PayWithSolana } from "@/components/PayWithSolana";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          Pay with Solana (No Wallet)
        </h1>
        <p className="text-muted-foreground max-w-md">
          This example shows how Lazorkit enables passkey-based
          smart wallets and gasless transactions on Solana.
        </p>
      </header>

      <ConnectButton />
      <PayWithSolana />

      <footer className="text-xs text-muted-foreground text-center">
        Devnet demo • Powered by Lazorkit
      </footer>
    </main>
  );
}
