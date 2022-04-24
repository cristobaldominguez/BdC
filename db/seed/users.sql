-- psql -d bdc -a -f db/seed/users.sql

INSERT INTO users(account, first_name, last_name, email, rut, address, password, balance) 
    VALUES(1234561, 'Cristóbal', 'Domínguez', 'cristobald@example.com', '12.345.678-5', 'Avda del Mar 1234', 'ClaveSecreta123', 100000),
          (1234562, 'Pedro', 'Pérez', 'pperez@example.com', '13.932.324-6', 'Tobalaba 9382', 'Password', 100000),
          (1234563, 'Juan', 'Pérez', 'jperez@example.com', '13.932.325-4', 'Tobalaba 9382', 'Passw0rd', 100000),
          (1234564, 'Diego', 'Pérez', 'dperez@example.com', '13.932.326-2', 'Tobalaba 9382', 'P4ssword', 100000);
