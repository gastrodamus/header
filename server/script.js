/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-syntax */
import http from 'k6/http';
import { check, sleep } from "k6";
// const faker = require('faker');
import faker from 'cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';

let desiredRPS = 1000; // total RPS for the test

let RPSperVU = 4;

let VUsRequired = Math.round(desiredRPS / RPSperVU);

export let options = {
  vus: VUsRequired,
  duration: "30s",
};

export default function() {
  let iterationStart = new Date().getTime(); // timestamp in ms

  for (let i = 0; i < RPSperVU; i++) {
    let id = faker.random.number({ min: 1, max: 10000000 });
    let baseUrl = `http://localhost:3003/api/header/${id}/category`;
    let userRes = http.get(`${baseUrl}`);

    check(userRes, {
      "user retrieval successful": (r) => r.status === 200
    }) || errorRate.add(1);

    return userRes.json();
  }

  let iterationDuration = (new Date().getTime() - iterationStart) / 1000;
  let sleepTime = 1 - iterationDuration;  // 1 second minus time spent on request execution

  if (sleepTime > 0) {
    sleep(sleepTime);
  }
}
