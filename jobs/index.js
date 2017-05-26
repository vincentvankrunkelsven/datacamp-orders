const schedule = require('node-schedule');

const announcementJob = require('./announcementJob');
const ordersJob = require('./ordersJob');

function startJobs() {
  schedule.scheduleJob("40 9 * * *", announcementJob.runJob);
  schedule.scheduleJob("45 9 * * *", ordersJob.runJob);
}

module.exports = {
  startJobs,
};
