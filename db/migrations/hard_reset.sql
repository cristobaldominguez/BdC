-- psql -a -f db/migrations/hard_reset.sql

DROP DATABASE IF EXISTS bdc;
CREATE DATABASE bdc;
\c bdc;

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

CREATE TABLE wire_transfers(
    id SERIAL,

    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO users(account, first_name, last_name, email, rut, address, password, balance) 
    VALUES(1234561, 'Cristóbal', 'Domínguez', 'cristobald@example.com', '12.345.678-5', 'Avda del Mar 1234', '123456', 100000),
          (1234562, 'Pedro', 'Pérez', 'pperez@example.com', '13.932.324-6', 'Tobalaba 9382', 'Password', 100000),
          (1234563, 'Juan', 'Pérez', 'jperez@example.com', '13.932.325-4', 'Tobalaba 9382', 'Passw0rd', 100000),
          (1234564, 'Diego', 'Pérez', 'dperez@example.com', '13.932.326-2', 'Tobalaba 9382', 'P4ssword', 100000);

INSERT INTO wire_transfers(id_from, id_to, comment, amount) 
    VALUES(2, 1, 'Pago mes Marzo 2021', 15000),
          (3, 1, 'Pago mes Marzo 2021', 15000),
          (4, 1, 'Pago mes Marzo 2021', 15000),
          (2, 1, 'Pago mes Abril 2021', 15000),
          (3, 1, 'Pago mes Abril 2021', 15000),
          (4, 1, 'Pago mes Abril 2021', 15000),
          (2, 1, 'Pago mes Mayo 2021', 15000),
          (3, 1, 'Pago mes Mayo 2021', 15000),
          (4, 1, 'Pago mes Mayo 2021', 15000),
          (2, 1, 'Pago mes Junio 2021', 15000),
          (3, 1, 'Pago mes Junio 2021', 15000),
          (4, 1, 'Pago mes Junio 2021', 15000),
          (2, 1, 'Pago mes Julio 2021', 15000),
          (3, 1, 'Pago mes Julio 2021', 15000),
          (4, 1, 'Pago mes Julio 2021', 15000),
          (2, 1, 'Pago mes Agosto 2021', 15000),
          (3, 1, 'Pago mes Agosto 2021', 15000),
          (4, 1, 'Pago mes Agosto 2021', 15000),
          (2, 1, 'Pago mes Septiembre 2021', 15000),
          (3, 1, 'Pago mes Septiembre 2021', 15000),
          (4, 1, 'Pago mes Septiembre 2021', 15000),
          (2, 1, 'Pago mes Octubre 2021', 15000),
          (3, 1, 'Pago mes Octubre 2021', 15000),
          (4, 1, 'Pago mes Octubre 2021', 15000),
          (2, 1, 'Pago mes Noviembre 2021', 15000),
          (3, 1, 'Pago mes Noviembre 2021', 15000),
          (4, 1, 'Pago mes Noviembre 2021', 15000),
          (2, 1, 'Pago mes Diciembre 2021', 15000),
          (3, 1, 'Pago mes Diciembre 2021', 15000),
          (4, 1, 'Pago mes Diciembre 2021', 15000),
          (2, 1, 'Pago mes Enero 2022', 15000),
          (3, 1, 'Pago mes Enero 2022', 15000),
          (4, 1, 'Pago mes Enero 2022', 15000),
          (2, 1, 'Pago mes Febrero 2022', 15000),
          (3, 1, 'Pago mes Febrero 2022', 15000),
          (4, 1, 'Pago mes Febrero 2022', 15000),
          (2, 1, 'Pago mes Marzo 2022', 15000),
          (3, 1, 'Pago mes Marzo 2022', 15000),
          (4, 1, 'Pago mes Marzo 2022', 15000),
          (2, 1, 'Pago mes Abril 2022', 15000),
          (3, 1, 'Pago mes Abril 2022', 15000),
          (4, 1, 'Pago mes Abril 2022', 15000),
          (2, 1, 'Pago mes Mayo 2022', 15000),
          (3, 1, 'Pago mes Mayo 2022', 15000),
          (4, 1, 'Pago mes Mayo 2022', 15000);