# header

> Business page header for munch, a web-based restaurant review platform, including a trend/history of rating details

## Related Projects

  - https://github.com/gastrodamus/header
  - https://github.com/gastrodamus/popular
  - https://github.com/gastrodamus/reservation

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)
1. [Authors](#authors)
1. [License](#license)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development

```
./cassandra-loader -f ./server/db/cassandra/restaurant.csv -host localhost -numThreads 2 -schema "business.restaurant(restaurant_id, restaurant_name, avg_star, price)"
./cassandra-loader -f ./server/db/cassandra/restaurant_by_category.csv -host localhost -numThreads 2 -schema "business.restaurant_by_category(restaurant_id, restaurant_name, category_id, category)"
./cassandra-loader -f ./server/db/cassandra/review.csv -host localhost -numThreads 2 -schema "business.restaurant_to_reviews(review_id, restaurant_id, star, date)"
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
```
## API

| HTTP Method  | Endpoint               |
| -----------  | ---------------------- |
| GET          | /api/header/:listingid |
| POST         | /api/header/           |
| PUT          | /api/header/           |
| DELETE       | /api/header/:id        |

## Authors
Esme

## License
MIT
