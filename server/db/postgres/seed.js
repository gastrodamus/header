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

const createData = (i, writeStream, writeStreamReview, writeStreamJoin) => {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const stars = [];

  const restaurantId = i + 1;
  let reviewData = '';

  for (let m = 0; m < 6; m += 1) { // Generates reviews for past 6 months
    const reviewsPerMth = faker.random.number({ min: 1, max: 20 });
    for (let j = 0; j < reviewsPerMth; j += 1) { // Generates random reviews for each month
      const date = month[m].concat('-', faker.random.number({ min: 1, max: 28 }).toString().concat('-', '2019'));
      const star = faker.random.number({ min: 1, max: 5 });
      stars.push(star);
      reviewData += [restaurantId, star, date].join(',');
      reviewData += '\n';
    }
  }
  writeStreamReview.write(reviewData, 'utf-8');

  let restaurantData = [
    restaurantId,
    makeRestaurantName(),
    Math.round(mean(stars) * 10) / 10,
    faker.random.number({ min: 10, max: 100 }),
  ].join(',');
  restaurantData += '\n';
  writeStream.write(restaurantData, 'utf-8');

  const categoryIdsArr = [null, null, null];
  const categoryIdsObj = {};

  const generateUniqueId = () => {
    const result = faker.random.number({ min: 1, max: 50 });
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

  let joinData = '';

  for (let k = 0; k < 3; k += 1) { // Generates 3 categories for one restaurant
    joinData += [
      restaurantId,
      categoryIdsArr[k],
    ].join(',');
    joinData += '\n';
  }
  return writeStreamJoin.write(joinData, 'utf-8');
};

function createCategories(writeStreamCategory) {
  let categoryData = '';
  for (let l = 0; l < 50; l += 1) {
    const category = [];
    category.push(l + 1);
    category.push(faker.lorem.word());
    categoryData += category.join(',');
    categoryData += '\n';
  }
  writeStreamCategory.write(categoryData, 'utf-8');
}

function writeData() {
  console.time('calculationTime');
  let i = 1;
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../csv/business.csv'));
  const writeStreamJoin = fs.createWriteStream(path.resolve(__dirname, '../csv/join.csv'));
  const writeStreamReview = fs.createWriteStream(path.resolve(__dirname, '../csv/review.csv'));
  const writeStreamCategory = fs.createWriteStream(path.resolve(__dirname, '../csv/category.csv'));

  createCategories(writeStreamCategory);

  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        // Last time!
        createData(i, writeStream, writeStreamReview, writeStreamJoin);
        console.timeEnd('calculationTime');
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = createData(i, writeStream, writeStreamReview, writeStreamJoin);
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
