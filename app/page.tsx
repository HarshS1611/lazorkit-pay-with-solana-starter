"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { WalletTabs } from "@/components/WalletTabs";
import { useWallet } from "@lazorkit/wallet";

export default function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Lazorkit Wallet Example</h1>
        <p className="text-muted-foreground max-w-md">
          A minimal wallet-style interface demonstrating passkey-based smart
          wallets and gasless transactions.
        </p>
      </header>

      <ConnectButton />
      <WalletTabs />
      <p className="text-xs text-muted-foreground text-center">
        Devnet demo · Powered By Lazorkit Wallet
      </p>
    </main>
  );
}
