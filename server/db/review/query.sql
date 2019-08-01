\connect header root;

CREATE INDEX review_res_index ON review(restaurant_id);

CREATE INDEX review_index ON review_dish(review_id);
CREATE INDEX dish_index ON review_dish(dish_id);

EXPLAIN ANALYZE SELECT * FROM review WHERE restaurant_id = 10000000;