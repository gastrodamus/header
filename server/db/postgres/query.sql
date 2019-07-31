\connect header root;

-- DROP INDEX res_index;
-- DROP INDEX cat_index;

CREATE INDEX res_index ON restaurant_category(restaurant_id);
CREATE INDEX cat_index ON restaurant_category(category_id);

EXPLAIN ANALYZE SELECT * FROM restaurant WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE SELECT category_id FROM restaurant_category WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE SELECT * FROM category WHERE category_id in (9, 15, 13);
EXPLAIN ANALYZE INSERT INTO restaurant_category (restaurant_id, category_id) 
    VALUES (10000000, 16);
EXPLAIN ANALYZE UPDATE restaurant
    SET restaurant_name = 'Crabby House Sticks'
    WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE UPDATE restaurant_category 
    SET category_id = 1
    WHERE restaurant_id = 1
    AND category_id = 11;
EXPLAIN ANALYZE DELETE FROM restaurant_category
    WHERE restaurant_id = 10000001;
EXPLAIN ANALYZE DELETE FROM restaurant 
    WHERE restaurant_id = 10000001;
EXPLAIN ANALYZE DELETE FROM restaurant_category 
    WHERE restaurant_id = 10000000
    AND category_id = 16;