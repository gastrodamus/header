## CASSANDRA
------------
From the command line
```
cqlsh -f ./server/db/cassandra/schema.cql
```

Config
```
CHUNKSIZE=5000
MINBATCHSIZE=10
PREPAREDSTATEMENTS=True
NUMPROCESSES=2
```

### restaurant table
```
COPY business.restaurant (restaurant_id,restaurant_name,avg_star,price) from '/Users/Esme/Code/hackReactor/header/server/db/csv/restaurant.csv'
WITH
CHUNKSIZE=5000 AND
MINBATCHSIZE=10 AND
PREPAREDSTATEMENTS=True AND
NUMPROCESSES=2;
```
### restaurant_by_category table
```
COPY business.restaurant_by_category (restaurant_id, restaurant_name, category_id, category) from '/Users/Esme/Code/hackReactor/header/server/db/csv/restaurant_by_category.csv'
WITH
CHUNKSIZE=5000 AND
MINBATCHSIZE=10 AND
PREPAREDSTATEMENTS=True AND
NUMPROCESSES=2;
```
### restaurant_to_reviews table
```
COPY business.restaurant_to_reviews(review_id, restaurant_id, star, date) from '/Users/Esme/Code/hackReactor/header/server/db/csv/review.csv'
WITH
CHUNKSIZE=5000 AND
MINBATCHSIZE=10 AND
PREPAREDSTATEMENTS=True AND
NUMPROCESSES=2;
```
-----------
## POSTGRES
-----------

From the command line
```
psql postgres;
psql business;
```
copy into postgres
```
psql postgres -f ./server/db/postgres/schema.sql
```
or from inside postgres
```
\i './server/db/postgres/schema.sql'
```

show databases
```
\l+
```

### restaurant table
```
\copy business_schema.restaurant(restaurant_id, restaurant_name, avg_star, price) from '/Users/Esme/Code/hackReactor/header/server/db/csv/restaurant.csv' DELIMITER ',' CSV;
```
### review table
```
\copy business_schema.review(review_id, restaurant_id, star, date) from '/Users/Esme/Code/hackReactor/header/server/db/csv/review.csv' DELIMITER ',' CSV;
```
### category table
```
\copy business_schema.category(category_id, category) from '/Users/Esme/Code/hackReactor/header/server/db/csv/category.csv' DELIMITER ',' CSV;
```
### restaurant_category table
```
\copy business_schema.restaurant_category(restaurant_category_id, restaurant_id, category_id) from '/Users/Esme/Code/hackReactor/header/server/db/csv/restaurant_category.csv' DELIMITER ',' CSV;
```
