-- STEPS:
-- 1. npm run seed-postgres
-- 2. psql postgres -f ./server/db/postgres/schema.sql

-- CREATE ROLE root WITH SUPERUSER;
DROP DATABASE IF EXISTS header;

CREATE DATABASE header;
\connect header;

CREATE TABLE restaurant (
  restaurant_id SERIAL PRIMARY KEY,
  restaurant_name TEXT,
  avg_star FLOAT(4),
  price INTEGER
);

CREATE TABLE category (
  category_id SERIAL PRIMARY KEY,
  category_name TEXT
);

CREATE TABLE restaurant_category (
  restaurant_category_id SERIAL PRIMARY KEY,
  restaurant_id INTEGER,
  category_id INTEGER
);

CREATE INDEX res_index ON restaurant_category(restaurant_id);
CREATE INDEX cat_index ON restaurant_category(category_id);

\timing

-- run from root directory
\copy restaurant(restaurant_name, avg_star, price) FROM PROGRAM 'gzip -dc ./server/db/postgres/restaurant.csv.gz' DELIMITER ',' CSV;
\copy category(category_name) FROM PROGRAM 'gzip -dc ./server/db/postgres/category.csv.gz' DELIMITER ',' CSV;
\copy restaurant_category(restaurant_id, category_id) FROM PROGRAM 'gzip -dc ./server/db/postgres/restaurant_category.csv.gz' DELIMITER ',' CSV;

ALTER TABLE restaurant_category
ADD CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id);
ALTER TABLE restaurant_category
ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category (category_id);
