"use client";

import { useState } from "react";
import { useWallet } from "@lazorkit/wallet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const EXPLORER_BASE =
  "https://explorer.solana.com/tx";

export function SendTab() {
  const { smartWalletPubkey, signAndSendTransaction } =
    useWallet();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("0.05");
  const [loading, setLoading] = useState(false);
  const [txUrl, setTxUrl] = useState<string | null>(null);

  const send = async () => {
    if (!smartWalletPubkey) {
      toast.error("Connect wallet first");
      return;
    }

    if (!recipient) {
      toast.error("Recipient address is required");
      return;
    }

    let destination: PublicKey;
    try {
      destination = new PublicKey(recipient);
    } catch {
      toast.error("Invalid Solana address");
      return;
    }

    const solAmount = Number(amount);
    if (isNaN(solAmount) || solAmount <= 0) {
      toast.error("Enter a valid SOL amount");
      return;
    }

    try {
      setLoading(true);
      setTxUrl(null);

      toast.loading("Signing transaction with passkey…");

      const instruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: destination,
        lamports: solAmount * LAMPORTS_PER_SOL,
      });

      const signature = await signAndSendTransaction({
        instructions: [instruction],
        transactionOptions: {
          feeToken: "USDC",
        },
      });

      const url = `${EXPLORER_BASE}/${signature}?cluster=devnet`;
      setTxUrl(url);

      toast.success("Transaction sent (gasless)");
    } catch (err) {
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-5 space-y-5">
      <div>
        <h2 className="text-lg font-semibold">
          Send SOL
        </h2>
        <p className="text-sm text-muted-foreground">
          This transaction is signed with your device passkey.
          Network fees are sponsored by Lazorkit.
        </p>
      </div>

      {/* Recipient */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Recipient address
        </label>
        <Input
          placeholder="Enter Solana address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </div>

      {/* Amount */}
      <div className="space-y-1">
        <label className="text-sm font-medium">
          Amount (SOL)
        </label>
        <Input
          type="number"
          min="0"
          step="0.0001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Fee explanation */}
      <div className="rounded-md border p-3 text-xs text-muted-foreground">
        <p>
          • You do <strong>not</strong> need SOL for gas  
        </p>
        <p>
          • Fees are paid using a <strong>paymaster</strong>  
        </p>
        <p>
          • No wallet extension is required  
        </p>
      </div>

      {/* Action */}
      <Button
        onClick={send}
        disabled={loading}
        className="w-full cursor-pointer"
      >
        {loading ? "Processing…" : "Send SOL"}
      </Button>

      {/* Success */}
      {txUrl && (
        <a
          href={txUrl}
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-blue-600 underline"
        >
          View transaction on Solana Explorer
        </a>
      )}
    </Card>
  );
}
