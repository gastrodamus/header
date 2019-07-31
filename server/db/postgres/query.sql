\connect header root;

-- DROP INDEX res_index;
-- DROP INDEX cat_index;

CREATE INDEX res_index ON restaurant_category(restaurant_id);
CREATE INDEX cat_index ON restaurant_category(category_id);

EXPLAIN ANALYZE SELECT category_id FROM restaurant_category WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE SELECT * FROM restaurant_category WHERE category_id in (6, 7, 14);

-- EXPLAIN ANALYZE INSERT INTO restaurant_category (restaurant_id, category_id) 
--   VALUES (1, 3);
-- EXPLAIN ANALYZE INSERT INTO restaurant (restaurant_name, price) 
--   VALUES (1, 15);
-- EXPLAIN ANALYZE UPDATE restaurant
--     SET restaurant_name = Crabby House
--     WHERE restaurant_id = 1;
-- EXPLAIN ANALYZE UPDATE restaurant_category 
--     SET category_id = 2
--     WHERE restaurant_id = 1
--     AND category_id = 3;
-- EXPLAIN ANALYZE DELETE FROM restaurant 
--     WHERE restaurant_id = 999999;