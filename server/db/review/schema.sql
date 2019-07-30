-- CREATE ROLE root WITH SUPERUSER;

\connect header root;

-- relationship
-- one review to many restaurants
-- many dishes to many restaurants
CREATE TABLE review (
  review_id SERIAL PRIMARY KEY,
  review TEXT,
  restaurant_id INTEGER,
  star INTEGER,
  "date" TEXT
);

CREATE TABLE review_dish (
  review_dish_id SERIAL PRIMARY KEY,
  review_id INTEGER,
  dish_id INTEGER
);

CREATE INDEX review_index ON review_dish(review_id);
CREATE INDEX dish_index ON review_dish(dish_id);

\timing

-- run from root directory
\copy review(review, restaurant_id, star, date) FROM PROGRAM 'gzip -dc ./server/db/review/review.csv.gz' DELIMITER ',' CSV;
\copy review_dish(review_id, dish_id) FROM PROGRAM 'gzip -dc ./server/db/review/review_dish.csv.gz' DELIMITER ',' CSV;

ALTER TABLE review_dish
ADD CONSTRAINT fk_review_id FOREIGN KEY (review_id) REFERENCES review (review_id);

ANALYZE;