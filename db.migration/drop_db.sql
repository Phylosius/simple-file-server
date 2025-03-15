-- Disconnect all users from the database
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'simple_file_server_db'
AND pid <> pg_backend_pid();

-- Drop database if exists
DROP DATABASE IF EXISTS "simple_file_server_db";

-- Drop user if exists
DROP USER IF EXISTS "simple_file_server_db_user"; 