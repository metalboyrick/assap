# 🟥🟦 ASSAP - Anti Sybil Solana Attestation Protocol 🟥🟦

> **Note:** This project uses PNPM as the primary package manager.

## Project Summary

ASSAP (Anti-Sybil Attestation Protocol) is a decentralized identity verification protocol built on Solana. It empowers users and developers with secure, human-readable attestations, modular sybil protection, and easy-to-use SDKs, aiming to redefine trust on-chain. ([Read More](https://www.assap.xyz/))

## Monorepo Composition

This monorepo is structured with the following main applications and packages:

### Applications (`apps/`)

- `main`: The main Next.js application serving as the ASSAP explorer and user interface.
- `landing`: The public landing page for ASSAP.
- `deck`: (Deprecated) Contains the pitch deck for ASSAP (using Slidev).
- `docs`: (WIP) Houses the documentation for the ASSAP protocol and its components.

### Packages (`packages/`)

- `assap-sdk`: The core Software Development Kit (SDK) for integrating ASSAP functionalities into your projects.
- `ui`: A shared UI component library used across different applications in the monorepo.
- `eslint-config`: Shared ESLint configurations for consistent code linting.
- `typescript-config`: Shared TypeScript configurations (`tsconfig.json`) for the monorepo.

## Using the `@assap-xyz/assap-sdk`

The `@assap-xyz/assap-sdk` provides the necessary tools to integrate ASSAP's attestation functionality into your Solana applications.

### Installation

To get started, install the SDK using pnpm:

```sh
pnpm add @assap-xyz/assap-sdk
```

Or using npm:

```sh
npm install @assap-xyz/assap-sdk
```

Or using yarn:

```sh
yarn add @assap-xyz/assap-sdk
```

### Quick Start: `AttestButton`

The easiest way to allow users to create attestations is by using the `AttestButton` component.

1.  **Wrap your application (or the relevant part) with `AssapProvider`**:
    This provider component sets up the necessary context for the SDK components to function correctly.

    ```tsx
    // Example: src/app/layout.tsx or your main app component
    import { AssapProvider } from "@assap-xyz/assap-sdk";
    import "@assap-xyz/assap-sdk/dist/style.css"; // Import default styles

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <AssapProvider>{children}</AssapProvider>
          </body>
        </html>
      );
    }
    ```

2.  **Use the `AttestButton` component**:
    Place the `AttestButton` where you want the attestation functionality. You'll need to provide a `schemaId`, `attestData`, `cluster` and an `onAttestComplete` callback.

    ```tsx
    import { AttestButton, AttestationData } from "@assap-xyz/assap-sdk";
    import { Cluster } from "@solana/web3.js";

    function MyComponent() {
      const handleAttestationComplete = (txnHash: string) => {
        console.log("Attestation successful, transaction hash:", txnHash);
        // Handle post-attestation logic here
      };

      // Define your attestation data according to your schema
      const attestationData: AttestationData = {
        // ... your data fields
      };

      const P_SCHEMA_ID = "YOUR_SCHEMA_ID"; // Replace with your actual schema ID
      const P_CLUSTER: Cluster = "devnet"; // Or "mainnet-beta", "testnet"

      return (
        <div>
          {/* Other components */}
          <AttestButton
            schemaId={P_SCHEMA_ID}
            attestData={attestationData}
            onAttestComplete={handleAttestationComplete}
            cluster={P_CLUSTER}
            className="my-custom-styles" // Optional: for custom styling
          />
        </div>
      );
    }
    ```

    Refer to the `AttestButton.tsx` and `AssapProvider.tsx` components within the SDK for more details on props and usage.

## Running the `main` Application (Explorer Page)

The `main` application located in `apps/main` serves as the explorer and interface for interacting with the ASSAP protocol.

To run the `main` app in development mode:

```sh
cd apps/main
pnpm dev
```

This will typically start the Next.js development server on `http://localhost:3000`.

### Devnet Program ID

The ASSAP smart contract is deployed on the Solana Devnet with the following Program ID:

`4PbTBdcZP5CHTVzmQTNpQzGeLHkVvMAdhu7TopkjtQ4e`

This ID is used by the SDK and the explorer to interact with the on-chain program.
