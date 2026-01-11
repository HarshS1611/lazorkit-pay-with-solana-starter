"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@lazorkit/wallet";
import { Card } from "@/components/ui/card";
import { Copy, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { connection } from "@/lib/solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function OverviewTab() {
  const { wallet, smartWalletPubkey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!smartWalletPubkey) return;

    try {
      setLoading(true);
      const lamports = await connection.getBalance(
        smartWalletPubkey
      );
      setBalance(lamports / LAMPORTS_PER_SOL);
    } catch {
      toast.error("Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [smartWalletPubkey]);

  if (!wallet) {
    return (
      <Card className="p-5 space-y-4 text-lg font-semibold text-black">
        Wallet Not Connected
      </Card>
    );
  }
  

  const copy = async () => {
    await navigator.clipboard.writeText(wallet.smartWallet);
    toast.success("Address copied");
  };

  return (
    <Card className="p-5 space-y-4">
      {/* Balance */}
      <div>
        <p className="text-sm text-muted-foreground">
          SOL Balance
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">
            {balance === null
              ? "—"
              : `${balance.toFixed(4)} SOL`}
          </span>

          <button
            onClick={fetchBalance}
            disabled={loading}
            title="Refresh balance"
            className="cursor-pointer"
          >
            <RefreshCcw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Address */}
      <div>
        <p className="text-sm text-muted-foreground">
          Smart Wallet Address
        </p>
        <div className="flex items-center justify-between font-mono text-sm border rounded-md px-3 py-2">
          {wallet.smartWallet.slice(0, 6)}…
          {wallet.smartWallet.slice(-4)}
          <button className="cursor-pointer" onClick={copy}>
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Balance fetched directly from Solana Devnet RPC.
      </p>
    </Card>
  );
}
