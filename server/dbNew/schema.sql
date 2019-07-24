DROP DATABASE IF EXISTS Business;

CREATE DATABASE Business;

DROP SCHEMA IF EXISTS businessSchema CASCADE;

CREATE SCHEMA IF NOT EXISTS businessSchema;

CREATE TABLE businessSchema.items (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT,
  avg_stars INTEGER,
  price INTEGER,
  categories TEXT
);

CREATE TABLE businessSchema.reviews (
  id INTEGER NOT NULL PRIMARY KEY,
  item_id INTEGER REFERENCES businessSchema.items(id),
  star INTEGER,
  "date" DATE
);
