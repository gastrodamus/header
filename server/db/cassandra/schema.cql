DROP KEYSPACE IF EXISTS business;
CREATE KEYSPACE IF NOT EXISTS business
  WITH REPLICATION = { 
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };

USE business;

CREATE TABLE restaurant (
  restaurant_id uuid primary key,
  restaurant_name text,
  avg_star float,
  price int,
);

-- dont need category table anymore
-- CREATE TABLE category (
--   category_id int primary key,
--   category text,
-- );

CREATE TABLE restaurant_by_category (
  restaurant_id uuid,
  restaurant_name text,
  category_id int,
  category text,
  PRIMARY KEY (restaurant_id, category_id)
);

-- CREATE TABLE category_by_restaurant (
--   category_id int,
--   category text,
--   restaurant_id int,
--   restaurant_name text,
--   PRIMARY KEY (category_id, restaurant_id)
-- );

-- CREATE TABLE restaurant_to_reviews (
--   restaurant_id uuid,
--   review_id uuid,
--   star int,
--   "date" text,
--   PRIMARY KEY (restaurant_id, review_id)
-- );
