import { API_BASE_URL } from "./indexer.constants";
import { ApiError, NetworkError, NotFoundError } from "./indexer.errors";
import type { Attestation, Schema } from "./indexer.types";

export const getAttestationById = async (id: string): Promise<Attestation> => {
  try {
    const response = await fetch(`${API_BASE_URL}/attestations/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError("Attestation", id);
      }
      throw new ApiError(
        (await response.text()) || response.statusText,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError(
      `Failed to fetch attestation: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const getAttestationsBySchemaId = async (
  schemaId: string,
): Promise<Attestation[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/attestations?schema=${schemaId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new ApiError(
        (await response.text()) || response.statusText,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError(
      `Failed to fetch attestations by schema: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const getAttestationsByUser = async (
  userId: string,
): Promise<Attestation[]> => {
  try {
    const attesteeResponse = await fetch(
      `${API_BASE_URL}/attestations?attestee=${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!attesteeResponse.ok) {
      throw new ApiError(
        (await attesteeResponse.text()) || attesteeResponse.statusText,
        attesteeResponse.status,
      );
    }

    return await attesteeResponse.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError(
      `Failed to fetch attestations for user: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const getSchemaById = async (schemaId: string): Promise<Schema> => {
  try {
    const response = await fetch(`${API_BASE_URL}/schemas/${schemaId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError("Schema", schemaId);
      }
      throw new ApiError(
        (await response.text()) || response.statusText,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError(
      `Failed to fetch schema: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

export const getSchemasByUser = async (userId: string): Promise<Schema[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/schemas?creator=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new ApiError(
        (await response.text()) || response.statusText,
        response.status,
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new NetworkError(
      `Failed to fetch schemas for user: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
