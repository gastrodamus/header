# header

> Business page header for munch, a web-based restaurant review platform, including a trend/history of rating details

## Related Projects

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

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
```
## API

| HTTP Method  | Endpoint                        |
| -----------  | ------------------------------- |
| GET          | /api/header/:id/restaurant      |
|              | /api/header/:id/category        |
|              | /api/header/:id/reviews         |
| POST         | /api/header/:id/restaurant      |
|              | /api/:id/category/:catId        |
| PATCH        | /api/header/:id/restaurant      |
|              | /api/header/:id/category        |
| DELETE       | /api/header/:id/restaurant      |
| DELETE       | /api/header/:id/category/:catId |

Routes


## Authors
Esme

## License
MIT
