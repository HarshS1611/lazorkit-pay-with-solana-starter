

# Lazorkit Passkey Wallet — Reference Example

> **A minimal Next.js reference example demonstrating how to integrate Lazorkit to build passkey-based smart wallets and gasless Solana transactions.**

This repository is intentionally **not a full product**.
Its purpose is to help developers **understand, copy, and extend Lazorkit integration** as quickly as possible.

---

## What This Example Demonstrates

This project shows how Lazorkit enables a modern Solana UX:

* 🔐 Passkey authentication (WebAuthn)
* 🧠 Smart wallet creation & session restoration
* ⛽ Gasless transactions via paymaster
* 🧩 Clean, reusable starter structure
* 🎓 Step-by-step tutorials embedded directly in the README

No wallet extensions.
No seed phrases.
No SOL required for gas.

---

## Framework & Stack

* **Framework:** Next.js (React, App Router)
* **SDK:** `@lazorkit/wallet`
* **Network:** Solana Devnet
* **UI:** shadcn/ui + Tailwind
* **Notifications:** Sonner

---

## Architecture Overview

```text
User
 │
 │ Passkey (WebAuthn)
 ▼
Lazorkit Portal
 │
 │ Smart Wallet + Paymaster
 ▼
Solana Devnet
```

* Authentication uses **device biometrics**
* Wallets are **smart wallets**, not browser extensions
* Transactions are **signed with passkeys** and **executed gaslessly**

---

## SDK Installation & Configuration

### Install dependencies

```bash
npm install @lazorkit/wallet @solana/web3.js
```

### Lazorkit Provider Setup

The SDK is initialized once using `LazorkitProvider`:

```tsx
<LazorkitProvider
  rpcUrl="https://api.devnet.solana.com"
  portalUrl="https://portal.lazor.sh"
  paymasterConfig={{
    paymasterUrl: "https://kora.devnet.lazorkit.com",
  }}
>
  {children}
</LazorkitProvider>
```

This makes Lazorkit wallet state available throughout the app.

---

## Environment Setup

No environment variables are required.

⚠️ **Important WebAuthn Requirement**

Passkeys only work on:

* `http://localhost`
* OR a domain with **valid HTTPS**

Self-signed or invalid TLS certificates will cause passkey signing to fail.

---

## Running the Example

```bash
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Live Demo (Devnet)

> **Recommended:** deploy on Vercel for HTTPS support.

```text
https://lazorkit-pay-with-solana-starter.vercel.app/
```

This demo runs on **Solana Devnet**.

---

# 📘 Step-by-Step Tutorials

The following tutorials are included directly in this README to make onboarding fast and frictionless.

---

## Tutorial 1: Creating a Passkey-Based Smart Wallet

### Goal

Create or restore a Solana smart wallet using **passkeys instead of a wallet extension**.

---

### Step 1: Wrap the App with `LazorkitProvider`

This initializes Lazorkit and sets up the connection to:

* Solana Devnet
* Lazorkit portal
* Lazorkit paymaster

```tsx
<LazorkitProvider ...>
  <App />
</LazorkitProvider>
```

---

### Step 2: Trigger Passkey Authentication

Use the `connect()` method from `useWallet`:

```ts
const { connect } = useWallet();
await connect({ feeMode: "paymaster" });
```

What happens:

* Browser opens the Lazorkit portal
* WebAuthn prompts the user for biometric authentication
* A smart wallet is created or restored automatically

---

### Step 3: Access Wallet Information

After connecting:

```ts
const { wallet } = useWallet();
```

The `wallet` object contains:

* `smartWallet` → Solana address
* `credentialId` → passkey identifier
* `platform` → device info

This wallet is **persisted across sessions and devices** via passkeys.

---

### Why This Matters

* No seed phrase
* No wallet extension
* Sessions automatically restore on reconnect

This is the core UX improvement Lazorkit enables.

---

## Tutorial 2: Executing a Gasless Transaction

### Goal

Send a Solana transaction **without the user paying gas**.

---

### Step 1: Create a Solana Instruction

```ts
const instruction = SystemProgram.transfer({
  fromPubkey: smartWalletPubkey,
  toPubkey: destination,
  lamports: amount * LAMPORTS_PER_SOL,
});
```

This is a normal Solana instruction — no special SDK required.

---

### Step 2: Sign & Send with Lazorkit

```ts
await signAndSendTransaction({
  instructions: [instruction],
  transactionOptions: {
    feeToken: "USDC",
  },
});
```

What Lazorkit does:

* Signs the transaction using the passkey
* Submits it via a paymaster
* Sponsors the gas fees

---

### Step 3: Verify on Solana Explorer

The returned signature can be viewed on Devnet:

```text
https://explorer.solana.com/tx/<SIGNATURE>?cluster=devnet
```

---

### Why This Matters

* User does not need SOL
* Gas complexity is abstracted
* Ideal for payments, onboarding, and Web2-style flows

---

## Tutorial 3 (Bonus): Session Persistence Across Devices

### Goal

Restore the same wallet without re-creating it.

---

### How It Works

When `connect()` is called again:

* Lazorkit checks for an existing passkey
* If found, the wallet is restored silently
* No new wallet is created

This enables:

* seamless re-authentication
* cross-device login
* account recovery without seed phrases

---

## What This Example Intentionally Does NOT Include

To keep this example focused and teachable, it excludes:

* ❌ Token swaps
* ❌ Transaction history
* ❌ Multi-token portfolios
* ❌ Backend services
* ❌ Mainnet-only logic

This keeps the spotlight on **Lazorkit’s core primitives**.

---

## Repo Structure

```
app/
components/
  ├─ ConnectButton.tsx
  ├─ WalletTabs.tsx
  └─ tabs/
lib/
providers/
```

Designed to be:

* easy to copy
* easy to extend
* easy to learn from

---

## Resources

* Docs: [https://docs.lazorkit.com/](https://docs.lazorkit.com/)
* GitHub: [https://github.com/lazor-kit/lazor-kit](https://github.com/lazor-kit/lazor-kit)
* Community: [https://t.me/lazorkit](https://t.me/lazorkit)

---

## Final Note

This repository is meant to be:

* a **learning resource**
* a **starter template**
* a **reference implementation**

