-- psql -d bdc -a -f db/migrations/02_create_table_wire_transfers.sql

DROP TABLE IF EXISTS wire_transfers;
CREATE TABLE wire_transfers(
    id SERIAL,

    date TIMESTAMP NOT NULL,
    id_from INT NOT NULL,
    id_to INT NOT NULL,
    comment VARCHAR(50) NOT NULL,
    amount FLOAT NOT NULL,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE,
    
    PRIMARY KEY (id),
    FOREIGN KEY (id_from) REFERENCES users(id),
	FOREIGN KEY (id_to) REFERENCES users(id)
);