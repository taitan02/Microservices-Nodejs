create table users (
    "user_id" bigserial primary key,
    "phone" varchar not null,
    "email" varchar not null,
    "password" varchar not null,
    "salt" varchar not null,
    "user_type" varchar not null
    "created_at" timestamptz NOT NULL DEFAULT (now())
)