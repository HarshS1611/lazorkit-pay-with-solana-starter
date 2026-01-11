"use client";

import { useWallet } from "@lazorkit/wallet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { toast } from "sonner";
import { useState } from "react";

export function PayWithSolana() {
  const { signAndSendTransaction, smartWalletPubkey } = useWallet();
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    if (!smartWalletPubkey) {
      toast.error("Connect your wallet first");
      return;
    }

    try {
      setLoading(true);

      const destination = new PublicKey(
        "B7Lz5onmZnP1VZqtHJ7PDRW4wqt4E9TF9sVxLYgQAPWa"
      );

      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      });

      const sig = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: "USDC",
        },
      });

      toast.success("Transaction sent");
      console.log("Transaction signature:", sig);
    } catch (err: any) {
      if (
        err?.message?.includes("WebAuthn") ||
        err?.message?.includes("Signing failed")
      ) {
        toast.error(
          "Passkey signing blocked. Use localhost or valid HTTPS."
        );
      } else {
        toast.error("Transaction failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-3">
      <h2 className="text-lg font-semibold">
        Gasless Transaction
      </h2>
      <p className="text-sm text-muted-foreground">
        Fees are sponsored by Lazorkit paymaster.
      </p>

      <Button
        onClick={pay}
        disabled={loading}
        className="w-full cursor-pointer"
      >
        {loading ? "Processing…" : "Send 0.1 SOL"}
      </Button>
    </Card>
  );
}
