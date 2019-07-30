-- CREATE ROLE root WITH SUPERUSER;

DROP DATABASE IF EXISTS header;

CREATE DATABASE header;
\connect header root;

-- DROP SCHEMA IF EXISTS header_schema CASCADE;
-- CREATE SCHEMA IF NOT EXISTS header_schema AUTHORIZATION "root";

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
\copy restaurant(restaurant_name, avg_star, price) FROM PROGRAM 'gzip -dc ./server/db/postgres/csv/restaurant.csv.gz' DELIMITER ',' CSV;
\copy category(category_name) FROM PROGRAM 'gzip -dc ./server/db/postgres/csv/category.csv.gz' DELIMITER ',' CSV;
\copy restaurant_category(restaurant_id, category_id) FROM PROGRAM 'gzip -dc ./server/db/postgres/csv/restaurant_category.csv.gz' DELIMITER ',' CSV;

ALTER TABLE restaurant_category
ADD CONSTRAINT fk_restaurant_id FOREIGN KEY (restaurant_id) REFERENCES restaurant (restaurant_id);
ALTER TABLE restaurant_category
ADD CONSTRAINT fk_cateory_id FOREIGN KEY (category_id) REFERENCES category (category_id);

ANALYZE;