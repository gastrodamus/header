const express = require('express');
const { mean } = require('mathjs');

const app = express();
const port = 4000;
const path = require('path');

const reviewMessages = [
  'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
  'est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et',
  'quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione',
  'non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati',
  'harum non quasi et ratione tempore iure ex voluptates in ratione harum architecto fugit inventore cupiditate voluptates magni quo et',
  'doloribus at sed quis culpa deserunt consectetur qui praesentium accusamus fugiat dicta voluptatem rerum ut voluptate autem voluptatem repellendus aspernatur dolorem in',
  'maiores sed dolores similique labore et inventore et quasi temporibus esse sunt id et eos voluptatem aliquam aliquid ratione corporis molestiae mollitia quia et magnam dolor',
  'ut voluptatem corrupti velit ad voluptatem maiores et nisi velit vero accusamus maiores voluptates quia aliquid ullam eaque',
  'sapiente assumenda molestiae atque adipisci laborum distinctio aperiam et ab ut omnis et occaecati aspernatur odit sit rem expedita quas enim ipsam minus',
  'voluptate iusto quis nobis reprehenderit ipsum amet nulla quia quas dolores velit et non aut quia necessitatibus nostrum quaerat nulla et accusamus nisi facilis',
];

function simpleHash(str, max) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

function generateReviews(restaurantId) {
  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const stars = [1, 2, 3, 4, 5];

  const reviewArray = [];
  const starArray = [];

  let day = 1;
  let dishId = 1;

  for (let m = 0; m < 3; m += 1) { // Generates reviews for past 3 months
    const reviewsPerMth = simpleHash(restaurantId + m, 250);
    for (let j = 0; j < reviewsPerMth; j += 1) { // Generates random reviews for each month
      const date = month[m].concat('-', day.toString().concat('-', '2019'));
      const reviewId = m * 3 + j + 1;
      let star;
      // random num between 2 to 10
      const randomNum = simpleHash(restaurantId + m, 8) + 2;
      if (j < Math.round(randomNum / 10 * reviewsPerMth)) {
        // star is between 3 to 5
        star = stars[((reviewId + reviewsPerMth) % 2) + 3];
      } else {
        // star is between 1 to 5
        star = stars[(reviewId + reviewsPerMth) % 5];
      }
      starArray.push(star);
      const reviewMessage = reviewMessages[(reviewId + reviewsPerMth) % 10];
      reviewArray.push({
        review_id: reviewId,
        review_message: reviewMessage,
        date,
        star,
        dish_id: dishId,
      });
      dishId = (dishId + 1) % 10;
      day = (day + 1) % 28;
    }
  }
  const avgStar = Math.round(mean(starArray) * 100) / 100;
  const reviewData = {
    restaurant_id: restaurantId,
    avg_star: avgStar,
    reviews: reviewArray,
  };
  return reviewData;
}

app.get('/api/:id/review', (req, res) => {
  const reviews = generateReviews(req.params.id);
  res.send(reviews);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
