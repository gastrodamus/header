-- Run schema using command: cqlsh -f ./server/db/cassandra/schema.cql

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

-- ./cassandra-loader -f ./server/db/cassandra/restaurant.csv -host localhost -numThreads 2 -schema "business.restaurant(restaurant_id, restaurant_name, avg_star, price)"
-- ./cassandra-loader -f ./server/db/cassandra/restaurant_by_category.csv -host localhost -numThreads 2 -schema "business.restaurant_by_category(restaurant_id, restaurant_name, category_id, category)"
-- ./cassandra-loader -f ./server/db/cassandra/review.csv -host localhost -numThreads 2 -schema "business.restaurant_to_reviews(review_id, restaurant_id, star, date)"