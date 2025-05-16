export const PENDING_SCHEMA_DATA_LOCAL_STORAGE_KEY =
  "assap_pending_schema_data";
export const PENDING_ATTESTATION_DATA_LOCAL_STORAGE_KEY =
  "assap_pending_attestation_data";

export function getPendingAttestationDataFromLocalStorage(): any | undefined {
  const data = localStorage.getItem(PENDING_ATTESTATION_DATA_LOCAL_STORAGE_KEY);
  if (!data) return undefined;
  try {
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}
