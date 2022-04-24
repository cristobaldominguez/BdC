-- psql -d bdc -a -f db/migrations/01_create_table_users.sql

-- DROP TABLE IF EXISTS wire_transfers;
DROP TABLE IF EXISTS users;
CREATE TABLE users(
    id SERIAL,

    account INT NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    rut VARCHAR(12) NOT NULL UNIQUE,
    address VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    balance FLOAT NOT NULL CHECK (balance >= 0),

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,

    PRIMARY KEY (id)
);