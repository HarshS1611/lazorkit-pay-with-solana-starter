import { Connection } from "@solana/web3.js";

export const USDC_MINT =
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // Devnet USDC


export const connection = new Connection(
  "https://api.devnet.solana.com",
  "confirmed"
);
