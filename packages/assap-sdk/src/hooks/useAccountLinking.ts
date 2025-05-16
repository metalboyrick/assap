import { useSocialAccounts } from "@dynamic-labs/sdk-react-core";
import { ProviderEnum } from "@dynamic-labs/types";
import { IdentityVerifier } from "@/core/actions/schema";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAnchorProviderFromDynamic } from "@/hooks/useAnchorProviderFromDynamic";
import { PublicKey } from "@solana/web3.js";
import { updateUser } from "@/core/actions/users";

// Explicitly type the updateUser argument shape
interface UpdateUserArgs {
  solAccount?: PublicKey;
  twitterAccount?: boolean;
  emailAccount?: boolean;
  humanVerification?: boolean;
  solName?: boolean;
}

// Define a strategy type for verifiers
interface VerifierStrategy {
  verify: () => Promise<UpdateUserArgs>;
}

export function useAccountLinking({
  onUpdateUser,
}: {
  onUpdateUser:
    | ((args: UpdateUserArgs) => Promise<void>)
    | ((args: UpdateUserArgs) => void);
}) {
  const { signInWithSocialAccount } = useSocialAccounts();
  const { primaryWallet, user } = useDynamicContext();
  const { anchorProvider } = useAnchorProviderFromDynamic();

  const getCurrentPublicKey = () => {
    if (!primaryWallet?.address) throw new Error("Missing wallet address");
    return new PublicKey(primaryWallet.address);
  };

  // Helper to get the current public key
  const getExternalWalletAddress = () => {
    if (!user) return undefined;
    const externalWallet = user.verifiedCredentials.find(
      (credential) => credential.walletProvider === "browserExtension",
    );

    if (!externalWallet?.address) return undefined;

    return new PublicKey(externalWallet.address);
  };

  // Strategy implementations for each verifier
  const strategies: Record<IdentityVerifier, VerifierStrategy> = {
    [IdentityVerifier.Twitter]: {
      verify: async () => {
        await signInWithSocialAccount(ProviderEnum.Twitter);
        return { twitterAccount: true };
      },
    },
    [IdentityVerifier.Email]: {
      verify: async () => {
        await signInWithSocialAccount(ProviderEnum.Google); // Google for email
        return { emailAccount: true };
      },
    },
    [IdentityVerifier.SolBalance]: {
      verify: async () => {
        // await selectWalletOption("backpacksol");
        return { solAccount: getExternalWalletAddress() };
      },
    },
    [IdentityVerifier.SolMinTx]: {
      verify: async () => {
        // await selectWalletOption("backpacksol");
        return { solAccount: getExternalWalletAddress() };
      },
    },
    [IdentityVerifier.SolName]: {
      verify: async () => {
        // Implement Solana Name verification logic if needed
        return { solName: true };
      },
    },
    [IdentityVerifier.Human]: {
      verify: async () => {
        // Implement human verification logic if needed
        return { humanVerification: true };
      },
    },
  };

  const linkAndUpdateUserAccount = async (verifier: IdentityVerifier) => {
    if (!anchorProvider || !primaryWallet?.address)
      throw new Error("Missing provider or wallet");

    const strategy = strategies[verifier];
    if (!strategy) throw new Error("Unsupported verifier");

    // 1. Run the verification mechanism for the selected verifier and get update args
    const updateArgs = await strategy.verify();

    // specific for wallets do not do anything if null
    if (!updateArgs.solAccount) return;

    // 2. Call updateUser with the correct field(s)
    await updateUser(
      "devnet",
      getCurrentPublicKey(),
      anchorProvider,
      updateArgs,
    );
    onUpdateUser(updateArgs);
  };

  // Check if wallet verification meets requirements
  const checkWalletVerification = async (verifier: IdentityVerifier) => {
    const externalWalletAddress = getExternalWalletAddress();
    if (!externalWalletAddress) return false;

    // Here we would implement actual verification logic
    // For now, just return true if the wallet is connected
    linkAndUpdateUserAccount(verifier);
  };

  return { linkAndUpdateUserAccount, checkWalletVerification };
}
