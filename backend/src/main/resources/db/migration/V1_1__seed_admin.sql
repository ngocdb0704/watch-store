INSERT INTO roles
(
    id,
    code,
    name
)
VALUES
    (
        uuid_generate_v4(),
        'ADMIN',
        'Administrator'
    );

INSERT INTO users
(
    id,
    username,
    password,
    full_name,
    role_id,
    active,
    created_at,
    updated_at
)
VALUES
    (
        uuid_generate_v4(),
     'admin',
     '$2a$12$SGWsWo9mCNZCQeggeobShOI6rkuRZhucq5QSMoqnqOGpb2fmd3sKG',
     'Admin',
     (SELECT id FROM roles WHERE code = 'ADMIN'),
     true,
     now(),
     now()
    );