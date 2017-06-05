if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const schedule = require('node-schedule');

const announcementJob = require('./announcementJob');
const ordersJob = require('./ordersJob');

function startJobs() {
  schedule.scheduleJob("40 12 * * *", announcementJob.runJob);
  schedule.scheduleJob("41 12 * * *", ordersJob.runJob);
}

startJobs();
