if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const schedule = require('node-schedule');

const announcementJob = require('./announcementJob');
const ordersJob = require('./ordersJob');

function startJobs() {
  schedule.scheduleJob(process.env.SCHEDULE_ANNOUNCEMENT, announcementJob.runJob);
  schedule.scheduleJob(process.env.SCHEDULE_ORDER, ordersJob.runJob);
}

startJobs();
