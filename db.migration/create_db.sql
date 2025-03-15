-- Check if user exists and create if not
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'simple_file_server_db_user') THEN
        CREATE USER "simple_file_server_db_user" WITH PASSWORD 'simple_file_server_db_user password';
    END IF;
END
$$;

-- Create database if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'simple_file_server_db') THEN
        CREATE DATABASE "simple_file_server_db" WITH OWNER "simple_file_server_db_user";
    END IF;
END
$$;

\c simple_file_server_db

BEGIN;

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create file table with improved constraints and timestamps
CREATE TABLE IF NOT EXISTS file (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mimetype VARCHAR(127) NOT NULL,
    size BIGINT NOT NULL CHECK (size > 0),
    path VARCHAR(512) NOT NULL UNIQUE
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_file_name ON file(name);
CREATE INDEX IF NOT EXISTS idx_file_mimetype ON file(mimetype);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update timestamp
DROP TRIGGER IF EXISTS update_file_updated_at ON file;
CREATE TRIGGER update_file_updated_at
    BEFORE UPDATE ON file
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO simple_file_server_db_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO simple_file_server_db_user;

COMMIT;
