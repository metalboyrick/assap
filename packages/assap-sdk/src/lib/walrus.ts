const AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space";
const PUBLISHER = "https://publisher.walrus-testnet.walrus.space";

export type WalrusCreateBlobResponse =
  | {
      newlyCreated: {
        blobObject: {
          id: string;
          registeredEpoch: number;
          blobId: string;
          size: number;
          encodingType: string;
          certifiedEpoch: null | number;
          storage: any;
          deletable: boolean;
        };
        resourceOperation: {
          registerFromScratch: any;
        };
        cost: number;
      };
    }
  | {
      alreadyCertified: {
        blobId: string;
        event: {
          txDigest: string;
          eventSeq: string;
        };
        endEpoch: number;
      };
    };

/**
 * Stores data in the Walrus decentralized storage system
 *
 * @param data - The data object to be stored in Walrus
 * @returns A Promise that resolves to the blob ID string that can be used to retrieve the data
 * @throws Error if the Walrus API returns an error response or if the response format is invalid
 *
 * @example
 * ```typescript
 * const blobId = await storeData({
 *   schemaData: { type: "string", name: "email", data: "email" },
 *   humanMessage: "Verify your email address"
 * });
 * ```
 */
export async function storeData(data: any): Promise<string> {
  const response = await fetch(`${PUBLISHER}/v1/blobs`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      "Error from Walrus API:",
      response.status,
      response.statusText,
      errorText,
    );
    throw new Error(
      `Walrus API returned ${response.status} ${response.statusText}: ${errorText}`,
    );
  }

  const responseData: WalrusCreateBlobResponse = await response.json();

  if ("newlyCreated" in responseData) {
    return responseData.newlyCreated.blobObject.blobId;
  } else if ("alreadyCertified" in responseData) {
    return responseData.alreadyCertified.blobId;
  } else {
    throw new Error("Invalid response from Walrus API");
  }
}

/**
 * Fetches data from the Walrus decentralized storage system using a blob ID
 *
 * @template T - The expected type of the data being retrieved
 * @param id - The blob ID string that identifies the stored data
 * @returns A Promise that resolves to the data of type T that was previously stored
 * @throws Error if the Walrus API returns an error response or if the data cannot be retrieved
 *
 * @example
 * ```typescript
 * interface EmailSchema {
 *   schemaData: { type: string, name: string, data: string };
 *   humanMessage: string;
 * }
 *
 * const data = await getData<EmailSchema>(blobId);
 * ```
 */
export async function getData<T = any>(id: string): Promise<T> {
  const response = await fetch(`${AGGREGATOR}/v1/blobs/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
