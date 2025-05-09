export type HeliusWebhookResponse = Array<HeliusWebhookResponseItem>;

export type HeliusWebhookResponseItem = {
  /** Timestamp of when the block containing this transaction was confirmed. */
  blockTime: number;
  /** The transaction's index within the block. */
  indexWithinBlock: number;
  /** Contains metadata about the transaction's execution. */
  meta: {
    /** If an error occurred during transaction processing, this field will contain error details. null if successful. */
    err: null | any;
    /** The transaction fee paid, in lamports. */
    fee: number;
    /** A list of instructions executed as part of this transaction, often by programs called by the main transaction instructions. */
    innerInstructions: Array<{
      /** The index of the main instruction that triggered these inner instructions. */
      index: number;
      /** A list of the actual inner instructions. */
      instructions: Array<{
        /** An array of account key indexes, referring to the accountKeys array in the main transaction message. */
        accounts: number[];
        /** The instruction data, usually base58 encoded. */
        data: string;
        /** The index of the program ID in the accountKeys array. */
        programIdIndex: number;
      }>;
    }>;
    /** Information about addresses loaded via address lookup tables. */
    loadedAddresses: {
      /** List of readonly account addresses. */
      readonly: any[];
      /** List of writable account addresses. */
      writable: any[];
    };
    /** Log messages emitted by the programs during transaction execution. */
    logMessages: string[];
    /** Lamport balances of accounts after the transaction, in the same order as accountKeys. */
    postBalances: number[];
    /** Token balances of accounts after the transaction. */
    postTokenBalances: Array<{
      /** Index of the account in accountKeys. */
      accountIndex: number;
      /** The token mint address. */
      mint: string;
      /** The owner of the token account. */
      owner: string;
      /** The token program ID. */
      programId: string;
      /** Parsed token amount information. */
      uiTokenAmount: {
        /** Raw token amount. */
        amount: string;
        /** Number of decimals for the token. */
        decimals: number;
        /** User-friendly token amount (amount / 10^decimals). */
        uiAmount: number;
        /** User-friendly token amount as a string. */
        uiAmountString: string;
      };
    }>;
    /** Lamport balances of accounts before the transaction. */
    preBalances: number[];
    /** Token balances of accounts before the transaction. */
    preTokenBalances: Array<{
      /** Index of the account in accountKeys. */
      accountIndex: number;
      /** The token mint address. */
      mint: string;
      /** The owner of the token account. */
      owner: string;
      /** The token program ID. */
      programId: string;
      /** Parsed token amount information. */
      uiTokenAmount: {
        /** Raw token amount. */
        amount: string;
        /** Number of decimals for the token. */
        decimals: number;
        /** User-friendly token amount (amount / 10^decimals). */
        uiAmount: number;
        /** User-friendly token amount as a string. */
        uiAmountString: string;
      };
    }>;
    /** Information about any rewards distributed in this transaction. */
    rewards: any[];
  };
  /** The slot number in which the transaction was processed. */
  slot: number;
  /** Contains the core details of the transaction itself. */
  transaction: {
    /** The transaction message. */
    message: {
      /** A list of all account public keys involved in the transaction. Instructions refer to these accounts by their index in this array. */
      accountKeys: string[];
      /** Details if an address lookup table was used. */
      addressTableLookups: null | any;
      /** Information about the accounts and signatures. */
      header: {
        numReadonlySignedAccounts: number;
        numReadonlyUnsignedAccounts: number;
        numRequiredSignatures: number;
      };
      /** The list of instructions in the transaction. */
      instructions: Array<{
        /** Indexes pointing to accountKeys. */
        accounts: number[];
        /** Instruction data (base58 encoded). */
        data: string;
        /** Index of the invoked program in accountKeys. */
        programIdIndex: number;
      }>;
      /** The blockhash used for this transaction. */
      recentBlockhash: string;
    };
    /** An array of base58 encoded signatures for the transaction. */
    signatures: string[];
  };
};
