"use client";

import { LazorkitProvider } from "@lazorkit/wallet";

const CONFIG = {
  rpcUrl: "https://api.devnet.solana.com",
  portalUrl: "https://portal.lazor.sh",
  paymasterConfig: {
    paymasterUrl: "https://kora.devnet.lazorkit.com",
  },
};

export function LazorkitProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazorkitProvider
      rpcUrl={CONFIG.rpcUrl}
      portalUrl={CONFIG.portalUrl}
      paymasterConfig={CONFIG.paymasterConfig}
    >
      {children}
    </LazorkitProvider>
  );
}
