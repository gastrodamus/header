const faker = require('faker');
const fs = require('fs');
const { mean } = require('mathjs');
const path = require('path');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const categoryArr = ['American', 'Barbeque', 'Breakfast & Brunch', 'Burgers', 'Cafes', 'Chinese', 'Fast Food', 'French', 'Greek', 'Italian', 'Japanese', 'Mexican', 'Singaporean', 'Spanish', 'Sushi Bars', 'Taiwanese', 'Thai', 'Vietnamese'];

function createCategories(writeStreamCategory) {
  let categoryData = '';
  for (let l = 0; l < categoryArr.length; l += 1) {
    categoryData += [l + 1, categoryArr[l]].join(',');
    categoryData += '\n';
  }
  writeStreamCategory.write(categoryData, 'utf-8');
}

function createJoin(i, restaurantName, writeStreamJoin, writeStreamResByCategory) {
  const categoryIdsArr = [null, null, null];
  const categoryIdsObj = {};

  const generateUniqueId = () => {
    const result = faker.random.number({ min: 0, max: categoryArr.length - 1 });
    if (categoryIdsObj[result]) {
      generateUniqueId();
    } else {
      categoryIdsObj[result] = true;
    }
    return result;
  };

  categoryIdsArr[0] = generateUniqueId();
  categoryIdsArr[1] = generateUniqueId();
  categoryIdsArr[2] = generateUniqueId();

  // Create table restaurant_category (restaurant_id, category_id)
  let joinData = '';
  let resbyCategoryData = '';
  for (let k = 0; k < 3; k += 1) { // Generates 3 categories for one restaurant
    joinData += [
      i + 1,
      categoryIdsArr[k],
    ].join(',');
    joinData += '\n';

    resbyCategoryData += [
      i + 1,
      restaurantName,
      categoryIdsArr[k],
      categoryArr[categoryIdsArr[k]],
    ].join(',');
    resbyCategoryData += '\n';
  }
  writeStreamJoin.write(joinData, 'utf-8');
  writeStreamResByCategory.write(resbyCategoryData, 'utf-8');
}

const createData = (
  i,
  reviewId,
  writeStream,
  writeStreamReview,
  writeStreamJoin,
  writeStreamResByCategory,
) => {
  const starArr = [];

  // Create table review (review_id, restaurant_id, star, date)
  let reviewData = '';
  let newReviewId = reviewId;
  const restaurantId = i + 1;

  for (let m = 0; m < 3; m += 1) { // Generates reviews for past 6 months
    const reviewsPerMth = faker.random.number({ min: 1, max: 10 });
    for (let j = 0; j < reviewsPerMth; j += 1) { // Generates random review stars for each month
      const date = month[m].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', '2019'));
      const star = faker.random.number({ min: 1, max: 5 });
      starArr.push(star);
      reviewData += [newReviewId, restaurantId, star, date].join(',');
      reviewData += '\n';

      newReviewId += 1; // Increment reviewId by one
    }
  }
  writeStreamReview.write(reviewData, 'utf-8');

  // Create table restaurant (restaurant_id, restaurant_name, avg_star, price)
  const restaurantName = makeRestaurantName();
  let restaurantData = [
    restaurantId,
    restaurantName,
    Math.round(mean(starArr) * 10) / 10,
    faker.random.number({ min: 10, max: 100 }),
  ].join(',');
  restaurantData += '\n';

  createJoin(i, restaurantName, writeStreamJoin, writeStreamResByCategory);

  return {
    stream: writeStream.write(restaurantData, 'utf-8'),
    newReviewId,
  };
};

function writeData() {
  console.time('calculationTime');
  let i = 10000000; // Change to number of writes, i.e. 10m
  let reviewId = 1; // Keep track of reviewId
  const writeStream = fs.createWriteStream(path.resolve(__dirname, './csv/restaurant.csv'));
  const writeStreamJoin = fs.createWriteStream(path.resolve(__dirname, './csv/restaurant_category.csv'));
  const writeStreamResByCategory = fs.createWriteStream(path.resolve(__dirname, './csv/restaurant_by_category.csv'));
  const writeStreamReview = fs.createWriteStream(path.resolve(__dirname, './csv/review.csv'));
  const writeStreamCategory = fs.createWriteStream(path.resolve(__dirname, './csv/category.csv'));

  createCategories(writeStreamCategory);

  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // Last time!
        console.timeEnd('calculationTime');
        createData(i, reviewId, writeStream, writeStreamReview, writeStreamJoin, writeStreamResByCategory);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = createData(i, reviewId, writeStream, writeStreamReview, writeStreamJoin, writeStreamResByCategory).newReviewId;
        // Keep track of reviewId
        reviewId = ok;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writeStream.once('drain', write);
    }
  }
  write();
}

writeData();
