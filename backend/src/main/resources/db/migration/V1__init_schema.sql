CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles
(
    id UUID PRIMARY KEY,

    code VARCHAR(50) NOT NULL UNIQUE,

    name VARCHAR(255) NOT NULL,

    created_at TIMESTAMP,

    updated_at TIMESTAMP
);

CREATE TABLE users
(
    id UUID PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    full_name VARCHAR(255),

    role_id UUID NOT NULL,

    active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP,

    updated_at TIMESTAMP
);

ALTER TABLE users
    ADD CONSTRAINT fk_users_roles
        FOREIGN KEY(role_id)
            REFERENCES roles(id);

CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER
AS $$
BEGIN
    NEW.updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated
    BEFORE UPDATE
    ON users
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at();