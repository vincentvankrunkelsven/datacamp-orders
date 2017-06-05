if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const schedule = require('node-schedule');

const announcementJob = require('./announcementJob');
const ordersJob = require('./ordersJob');

function startJobs() {
  schedule.scheduleJob("50 16 * * *", announcementJob.runJob);
  schedule.scheduleJob("55 16 * * *", ordersJob.runJob);
}

startJobs();
