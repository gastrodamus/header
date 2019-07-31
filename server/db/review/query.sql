\connect header root;

CREATE INDEX review_index ON review_dish(review_id);
CREATE INDEX dish_index ON review_dish(dish_id);