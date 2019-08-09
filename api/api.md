## API Server Routes

### Restaurant listings

#### `GET /api/header/restaurants`

**Input**: none

**Output**: 100 restaurants in the database

#### `POST /api/header/restaurants`

**Input**: restaurant's name `resName` and price `resPrice` which will be used to add a new restaurant

```{"resName": "Seafood", "resPrice": 35}```

**Output**: none

### Restaurant's details and reviews

#### `GET /api/header/:id/restaurant`

**Input**: restaurant's `id` which will be used to look for a particular restaurant

**Output**: restaurant's business details and reviews

#### `DELETE /api/header/:id/restaurant`

**Input**: restaurant's `id` which will be used to delete a particular restaurant

**Output**: none

#### `PATCH /api/header/:id/restaurant`

**Input**: restaurant's `id`, restaurant's name `resName` and price `resPrice` which will be used to patch a particular restaurant's details

```{"resName": "Seafood", "resPrice": 35}```

**Output**: none

### Restaurant's categories

#### `GET /api/header/:id/category`

**Input**: restaurant's `id` which will be used to look for a particular restaurant's categories

**Output**: restaurant's categories

#### `POST /api/header/:id/category/:catId`

**Input**: restaurant's `id` and category's id `catId` which will be used to post a particular restaurant's category

**Output**: none

#### `DELETE /api/header/:id/category/:catId`

**Input**: restaurant's `id` and category's id `catId` which will be used to delete a particular restaurant's category

**Output**: none

#### `PATCH /api/header/:id/category/:catId`

**Input**: restaurant's `id`, category's id `catId`, and `newCatId` which will be used to patch a particular restaurant's category

```{"newCatId": "5"}```

**Output**: none