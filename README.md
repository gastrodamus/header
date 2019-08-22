# Gastrodamus

Backend architecture for Gastrodamus's Header and Review Microservices.

## Table of Contents

1. [Tech Stack](#tech-stack)
1. [API](#api)
1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Related Projects](#related-projects)

## Tech Stack

Back-end: Node.js, Express, AWS EC2, Nginx
<br />
Database: PostgreSQL, Cassandra
<br />
Load testing: Loader.io, K6, New Relic

## [API](https://github.com/gastrodamus/header/blob/master/api/api.md)

### Restaurant listings

- **<code>GET</code> api/header/restaurants**
- **<code>POST</code> api/header/restaurants**

### Restaurant's details and reviews

- **<code>GET</code> api/header/:id/restaurant**
- **<code>DELETE</code> api/header/:id/restaurant**
- **<code>PATCH</code> api/header/:id/restaurant**

## Restaurant's categories

- **<code>GET</code> api/header/:id/category**
- **<code>POST</code> api/header/:id/category/:catId**
- **<code>DELETE</code> api/header/:id/category/:catId**
- **<code>PATCH</code> api/header/:id/category/:catId**

## Usage

```bash
# clone this repository
$ git clone https://github.com/gastrodamus/header.git

# install dependencies
$ npm install webpack
$ npm install

# seed postgresql database
$ npm run schema-postgres
$ npm run postgres-seed

# bundle files with webpack
$ npm run react-dev

# run the app!
$ npm start
```

## Requirements

- Nvm
- Node
- Git

## Related Projects

  - https://github.com/gastrodamus/popular
  - https://github.com/gastrodamus/reservation
