-- Add transaction_id and attestation_index columns to the attestations table
ALTER TABLE attestations
ADD COLUMN transaction_id TEXT,
ADD COLUMN attestation_index BIGINT;

-- Create an index on transaction_id for faster lookups
CREATE INDEX idx_attestations_transaction_id ON attestations(transaction_id);

-- Create an index on attestation_index for faster lookups
CREATE INDEX idx_attestations_attestation_index ON attestations(attestation_index);

-- Add a comment explaining the purpose of these columns
COMMENT ON COLUMN attestations.transaction_id IS 'The transaction ID that created this attestation';
COMMENT ON COLUMN attestations.attestation_index IS 'The index of this attestation within its schema';
