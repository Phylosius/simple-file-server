CREATE USER "simple_file_server_db_user" WITH PASSWORD 'simple_file_server_db_user password';

CREATE DATABASE "simple_file_server_db" WITH OWNER "simple_file_server_db_user";

\c simple_file_server_db

CREATE TABLE file(
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    mimetype VARCHAR,
    size BIGINT,
    path VARCHAR
);
