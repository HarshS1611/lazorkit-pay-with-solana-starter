"use client";

import { useWallet } from "@lazorkit/wallet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, LogOut } from "lucide-react";
import { toast } from "sonner";

export function ConnectButton() {
  const {
    connect,
    disconnect,
    isConnected,
    isConnecting,
    wallet,
  } = useWallet();

  const copyAddress = async () => {
    if (!wallet?.smartWallet) return;
    await navigator.clipboard.writeText(wallet.smartWallet);
    toast.success("Wallet address copied");
  };

  const handleConnect = async () => {
    try {
      await connect({ feeMode: "paymaster" });
      toast.success("Wallet connected");
    } catch {
      toast.error(
        "Passkey connection failed. Use localhost or valid HTTPS."
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch {
      toast.error(
        "Passkey connection failed. Use localhost or valid HTTPS."
      );
    }
  };

  if (isConnected && wallet) {
    return (
      <Card className="w-full max-w-md p-4 space-y-3">
        <div className="text-sm text-muted-foreground">
          Connected smart wallet
        </div>

        <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm font-mono">
          {wallet.smartWallet.slice(0, 6)}…
          {wallet.smartWallet.slice(-4)}
          <button onClick={copyAddress}>
            <Copy className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleDisconnect}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md p-4 space-y-3">
      <h2 className="text-lg font-semibold">
        Connect with Passkey
      </h2>
      <p className="text-sm text-muted-foreground">
        No wallet. No seed phrase. Uses your device biometrics.
      </p>

      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full"
      >
        {isConnecting ? "Connecting…" : "Connect"}
      </Button>
    </Card>
  );
}
