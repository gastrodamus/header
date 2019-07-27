CREATE TABLE restaurant (
  restaurant_id uuid,
  restaurant_name text,
  avg_star float(4),
  price integer,
);

CREATE TABLE category (
  category_id uuid,
  category text,
);

CREATE TABLE restaurant_by_category (
  restaurant_id uuid,
  restaurant_name text,
  category_id uuid,
  category text,
  PRIMARY KEY (restaurant_id, category_id)
);

CREATE TABLE category_by_restaurant (
  category_id uuid PRIMARY KEY,
  category text,
  restaurant_id uuid,
  restaurant_name text,
  PRIMARY KEY (category_id, restaurant_id)
);

CREATE TABLE restaurant_to_reviews (
  restaurant_id uuid,
  restaurant_name text,
  review_id uuid,
  review text,
  PRIMARY KEY (restaurant_id, review_id)
);
