CREATE ROLE root WITH SUPERUSER;

DROP DATABASE IF EXISTS business;

CREATE DATABASE business;
\connect business;

DROP SCHEMA IF EXISTS business_schema CASCADE;
CREATE SCHEMA IF NOT EXISTS business_schema AUTHORIZATION "root";

CREATE TABLE business_schema.restaurant (
  id SERIAL PRIMARY KEY,
  name TEXT,
  avg_stars FLOAT(4),
  price INTEGER,
);

CREATE TABLE business_schema.review (
  id INTEGER NOT NULL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES business_schema.restaurant(id),
  star INTEGER,
  "date" DATE
);

CREATE TABLE business_schema.category (
  id SERIAL PRIMARY KEY,
  category TEXT,
)

CREATE TABLE business_schema.restaurant_category (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER,
  category_id INTEGER
)
