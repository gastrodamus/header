const faker = require('faker');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const chalk = require('chalk');

const makeRestaurantName = () => {
  const foodTypes = ['Pizza', 'Steak', 'Brunch', 'Seafood', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Seafood', 'Fish', 'Pho', 'Noodle', 'Ramen'];
  const foodPlaces = ['House', 'Cafe', 'Restaurant', 'Shoppe', 'Diner', 'Garden', 'Pub', 'Bar'];
  let adjective = faker.hacker.adjective();
  adjective = adjective[0].toUpperCase() + adjective.slice(1);
  return `${adjective} ${foodTypes[Math.floor(Math.random() * foodTypes.length)]} ${foodPlaces[Math.floor(Math.random() * foodPlaces.length)]}`;
};

const categoryArr = ['American', 'Barbeque', 'Breakfast & Brunch', 'Burgers', 'Cafes', 'Chinese', 'Fast Food', 'French', 'Greek', 'Italian', 'Japanese', 'Mexican', 'Singaporean', 'Spanish', 'Sushi Bars', 'Taiwanese', 'Thai', 'Vietnamese'];

function createCategories(writeStreamCategory) {
  let categoryData = '';
  for (let l = 0; l < categoryArr.length; l += 1) {
    categoryData += [categoryArr[l]].join(',');
    categoryData += '\n';
  }
  writeStreamCategory.write(categoryData, 'utf-8');
}

function createJoin(i, restaurantName, writeStreamJoin) {
  const categoryIdsArr = [null, null, null];
  const categoryIdsObj = {};

  const generateUniqueId = () => {
    const result = faker.random.number({ min: 1, max: categoryArr.length });
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
  for (let k = 3; k > 0; k -= 1) { // Generates 3 categories for one restaurant
    // Create table restaurant_category (restaurant_category_id, restaurant_id, category_id)
    joinData += [
      i,
      categoryIdsArr[k - 1],
    ].join(',');
    joinData += '\n';
  }
  writeStreamJoin.write(joinData, 'utf-8');
}

const createData = (
  i,
  writeStream,
  writeStreamJoin,
) => {
  // Create table restaurant (restaurant_name, avg_star, price)
  const restaurantName = makeRestaurantName();
  let restaurantData = [
    restaurantName,
    // Math.round(mean(starArr) * 10) / 10,
    faker.random.number({ min: 1, max: 5 }), // placeholder for average review stars
    faker.random.number({ min: 10, max: 100 }),
  ].join(',');
  restaurantData += '\n';

  createJoin(i, restaurantName, writeStreamJoin);

  return writeStream.write(restaurantData, 'utf-8');
};

function writeData() {
  let i = 10000000; // Change to number of writes, i.e. 10m

  console.time('calculationTime');
  console.log(chalk.blue(`write ${i} times`));
  console.log(chalk.green(moment().format('LLLL')));

  const writeStream = fs.createWriteStream(path.resolve(__dirname, 'restaurant.csv'));
  const writeStreamJoin = fs.createWriteStream(path.resolve(__dirname, 'restaurant_category.csv'));
  const writeStreamCategory = fs.createWriteStream(path.resolve(__dirname, 'category.csv'));

  createCategories(writeStreamCategory);

  function write() {
    let ok = true;
    do {
      i -= 1;
      if (i === 1) {
        // Last time!
        console.log(chalk.green(moment().format('LLLL')));
        console.timeEnd('calculationTime');
        createData(i, writeStream, writeStreamJoin);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = createData(i, writeStream, writeStreamJoin);
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
