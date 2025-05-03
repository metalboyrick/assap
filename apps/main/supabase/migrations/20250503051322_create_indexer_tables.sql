-- Create schemas table
CREATE TABLE IF NOT EXISTS schemas (
    schema_uid TEXT PRIMARY KEY,
    creation_transaction_id TEXT NOT NULL,
    creator_uid TEXT NOT NULL,
    creation_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    schema_name TEXT NOT NULL,
    schema_data TEXT NOT NULL,
    creation_cost DECIMAL(20, 9) NOT NULL DEFAULT 0,
    human_message_template TEXT,
    verification_requirements JSONB
);

-- Create attestations table
CREATE TABLE IF NOT EXISTS attestations (
    attestation_uid TEXT PRIMARY KEY,
    schema_uid TEXT NOT NULL REFERENCES schemas(schema_uid),
    attestee_uid TEXT NOT NULL,
    attestor_uid TEXT NOT NULL,
    creation_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    attestation_data JSONB,
    
    -- Add indexes for common query patterns
    CONSTRAINT fk_schema FOREIGN KEY (schema_uid) REFERENCES schemas(schema_uid)
);

-- Create indexes for performance
CREATE INDEX idx_attestations_schema_uid ON attestations(schema_uid);
CREATE INDEX idx_attestations_attestee_uid ON attestations(attestee_uid);
CREATE INDEX idx_attestations_attestor_uid ON attestations(attestor_uid);
CREATE INDEX idx_schemas_creator_uid ON schemas(creator_uid);
CREATE INDEX idx_schemas_schema_name ON schemas(schema_name);
