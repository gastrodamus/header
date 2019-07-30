\connect header root;

DROP INDEX res_index ON restaurant_category(restaurant_id);
DROP INDEX cat_index ON restaurant_category(category_id);

-- CREATE INDEX res_index ON restaurant_category(restaurant_id);
-- CREATE INDEX cat_index ON restaurant_category(category_id);

EXPLAIN ANALYZE SELECT * FROM restaurant WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE SELECT category_id FROM restaurant_category WHERE restaurant_id = 10000000;
EXPLAIN ANALYZE SELECT * FROM category WHERE category_id in (1, 14, 10);
