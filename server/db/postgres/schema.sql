CREATE ROLE root WITH SUPERUSER;

DROP DATABASE IF EXISTS business;

CREATE DATABASE business;
\connect business;

DROP SCHEMA IF EXISTS business_schema CASCADE;
CREATE SCHEMA IF NOT EXISTS business_schema AUTHORIZATION "root";

CREATE TABLE business_schema.items (
  id SERIAL PRIMARY KEY,
  name TEXT,
  avg_stars FLOAT(4),
  price INTEGER,
  categories TEXT
);

CREATE TABLE business_schema.reviews (
  id INTEGER NOT NULL PRIMARY KEY,
  item_id INTEGER REFERENCES business_schema.items(id),
  star INTEGER,
  "date" DATE
);
