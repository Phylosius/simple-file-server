import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres('postgres://username:password@host:port/database', {
    host                 : process.env.DB_HOST || 'localhost',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : process.env.DB_NAME || 'simple_file_server_db',            // Name of database to connect to
    username             : process.env.DB_USERNAME || 'simple_file_server_db_user',            // Username of database user
    password             : process.env.DB_PASSWORD || 'simple_file_server_db_user password',            // Password of database user
});

export default sql;

