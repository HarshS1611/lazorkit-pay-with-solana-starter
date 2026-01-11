"use client";

import { useWallet } from "@lazorkit/wallet";
import { Card } from "@/components/ui/card";

export function ReceiveTab() {
  const { wallet } = useWallet();

  if (!wallet) {
    return (
      <Card className="p-5 space-y-4 text-lg font-semibold text-black">
        Wallet Not Connected
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-3">
      <p className="text-sm text-muted-foreground">
        Receive Address
      </p>

      <div className="font-mono text-sm border rounded-md px-3 py-2 break-all">
        {wallet.smartWallet}
      </div>

      <p className="text-xs text-muted-foreground">
        Anyone can send SOL or tokens to this address.
      </p>
    </Card>
  );
}
