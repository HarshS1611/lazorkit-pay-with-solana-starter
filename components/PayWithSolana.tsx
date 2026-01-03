"use client";

import { useWallet } from "@lazorkit/wallet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export function PayWithSolana() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();

  const pay = async () => {
    if (!smartWalletPubkey) return;

    const destination = new PublicKey(
      "RECIPIENT_DEVNET_ADDRESS"
    );

    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: destination,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    });

    const signature = await signAndSendTransaction({
      instructions: [instruction],
      transactionOptions: {
        feeToken: "USDC",
      },
    });

    alert(`Transaction sent: ${signature}`);
  };

  return (
    <Card className="p-6 max-w-sm space-y-4">
      <h2 className="text-lg font-semibold">
        Pay with Solana
      </h2>
      <p className="text-sm text-muted-foreground">
        Gasless transaction sponsored by Lazorkit.
      </p>
      <Button onClick={pay} className="w-full">
        Send 0.1 SOL
      </Button>
    </Card>
  );
}
