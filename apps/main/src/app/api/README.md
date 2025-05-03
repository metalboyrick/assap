# ASSAP API Documentation

This API provides access to the ASSAP (Anti-Sybil Attestation Protocol) data stored in Supabase.

## Authentication

All write operations (POST, PUT, DELETE) require an API key to be provided in the `x-api-key` header.

## Available Endpoints

### Hello

#### GET /api/hello

Returns a simple greeting message.

### Schemas

#### GET /api/schemas

Get all schemas with optional filtering.

Query parameters:

- `creator`: Filter by creator_uid
- `name`: Filter by schema_name

#### GET /api/schemas/[uid]

Get a specific schema by its UID. Replaces `HEAD /api/schemas?uid=<schema_uid>`.

#### POST /api/schemas

Create a new schema. Requires API key authentication.

Example request body:

```json
{
  "schema_uid": "unique-schema-id",
  "creation_transaction_id": "tx-id",
  "creator_uid": "creator-id",
  "schema_name": "My Schema",
  "schema_data": "schema-definition-string",
  "creation_cost": 0.001,
  "human_message_template": "Optional template",
  "verification_requirements": { "optional": "requirements" }
}
```

#### PUT /api/schemas?uid=<schema_uid>

Update an existing schema. Requires API key authentication.

#### DELETE /api/schemas?uid=<schema_uid>

Delete a schema. Requires API key authentication.

### Attestations

#### GET /api/attestations

Get all attestations with optional filtering.

Query parameters:

- `schema`: Filter by schema_uid
- `attestee`: Filter by attestee_uid
- `attestor`: Filter by attestor_uid

#### GET /api/attestations/[uid]

Get a specific attestation by its UID. Replaces `HEAD /api/attestations?uid=<attestation_uid>`.

#### POST /api/attestations

Create a new attestation. Requires API key authentication.

Example request body:

```json
{
  "attestation_uid": "unique-attestation-id",
  "schema_uid": "existing-schema-id",
  "attestee_uid": "attestee-id",
  "attestor_uid": "attestor-id",
  "attestation_data": { "optional": "data" }
}
```

#### PUT /api/attestations?uid=<attestation_uid>

Update an existing attestation. Requires API key authentication.

#### DELETE /api/attestations?uid=<attestation_uid>

Delete an attestation. Requires API key authentication.

## Environment Variables

The API requires the following environment variables to be set:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-side only)
- `API_KEY`: Your API key for write operations
