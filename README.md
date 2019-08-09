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
## [API Server Routes](https://github.com/gastrodamus/header/blob/master/api/api.md)

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

## Authors
Esme

## License
MIT
