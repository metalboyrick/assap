import { storeData, getData } from "../walrus";
import { describe, it, expect } from "vitest";

describe("Walrus API Integration Tests", () => {
  let blobId: string;

  it("should store data and return a blob ID", async () => {
    const testData = {
      message: "Test my things",
    };
    console.log("Storing data:", testData);
    const response = await storeData(testData);
    console.log("Store data response:", response);
    expect(response).toBeDefined();
    blobId = response; // Save blobId for the next test
  });

  it("should retrieve the stored data using the blob ID", async () => {
    // Ensure blobId was set by the previous test
    if (!blobId) {
      throw new Error(
        "blobId was not set. Ensure 'storeData' test runs successfully before this test.",
      );
    }
    console.log(`Fetching data for blob ID: ${blobId}`);
    const response = await getData<{ message: string }>(blobId);
    console.log("Get data response:", response);
    expect(response).toBeDefined();
    // Assuming the stored data is directly returned, adjust if the API wraps it
    expect(response.message).toEqual("Test my things");
  });
});
