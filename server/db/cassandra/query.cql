tracing on;
USE business;

-- SELECT * FROM restaurant limit 100;
-- SELECT * FROM restaurant WHERE restaurant_id = c1b1e5e2-45aa-4fa9-be74-562965f59ea0;
-- SELECT * FROM restaurant_by_category WHERE restaurant_id = c1b1e5e2-45aa-4fa9-be74-562965f59ea0;
-- INSERT INTO restaurant_by_category (restaurant_id, restaurant_name, category_id, category)
--     VALUES (9417b096-f028-400d-9a06-e692f990af1f, 'crabby sticks', 16, 'Thai');
-- INSERT INTO restaurant (restaurant_id, restaurant_name, price) VALUES (9417b096-f028-400d-9a06-e692f990af1f, 'crabby sticks', 10);
-- UPDATE restaurant
--     SET restaurant_name = 'crabhead'
--     WHERE restaurant_id = 9417b096-f028-400d-9a06-e692f990af1f;
-- DELETE FROM restaurant_by_category
--     WHERE restaurant_id = 9417b096-f028-400d-9a06-e692f990af1f;
-- DELETE FROM restaurant
--     WHERE restaurant_id = 9417b096-f028-400d-9a06-e692f990af1f;
DELETE FROM restaurant_by_category 
    WHERE restaurant_id = 9417b096-f028-400d-9a06-e692f990af1f
    AND category_id = 16;