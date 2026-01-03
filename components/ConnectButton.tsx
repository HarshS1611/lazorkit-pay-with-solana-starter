"use client";

import { useWallet } from "@lazorkit/wallet";
import { Button } from "@/components/ui/button";

export function ConnectButton() {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    wallet,
  } = useWallet();

  if (isConnected && wallet) {
    return (
      <Button variant="outline" onClick={() => disconnect()}>
        Disconnect ({wallet.smartWallet.slice(0, 6)}…)
      </Button>
    );
  }

  return (
    <Button onClick={() => connect({ feeMode: "paymaster" })} disabled={isConnecting}>
      {isConnecting ? "Connecting…" : "Connect with Passkey"}
    </Button>
  );
}
