if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const schedule = require('node-schedule');

const announcementJob = require('./announcementJob');
const ordersJob = require('./ordersJob');

function startJobs() {
  schedule.scheduleJob("55 16 * * *", announcementJob.runJob);
  schedule.scheduleJob("00 17 * * *", ordersJob.runJob);
}

startJobs();
