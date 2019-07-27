-- CREATE ROLE root WITH SUPERUSER;

DROP DATABASE IF EXISTS business;

CREATE DATABASE business;
\connect business;

DROP SCHEMA IF EXISTS business_schema CASCADE;
CREATE SCHEMA IF NOT EXISTS business_schema AUTHORIZATION "root";

CREATE TABLE business_schema.restaurant (
  restaurant_id INTEGER PRIMARY KEY,
  restaurant_name TEXT,
  avg_star FLOAT(4),
  price INTEGER
);

CREATE TABLE business_schema.category (
  category_id INTEGER PRIMARY KEY,
  category TEXT
);

CREATE TABLE business_schema.restaurant_category (
  restaurant_category_id INTEGER PRIMARY KEY,
  restaurant_id INTEGER,
  category_id INTEGER
);

CREATE TABLE business_schema.review (
  review_id INTEGER PRIMARY KEY,
  restaurant_id INTEGER,
  star INTEGER,
  "date" DATE
);

-- ALTER TABLE REFERENCES business_schema.restaurant(restaurant_id),