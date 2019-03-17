require('dotenv').config();

const path = require('path');
const port = process.env.PORT || 3000;

const express = require('express');
const announcements = require('./announcement.js');
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

// Mount the event handler on a route
// NOTE: you must mount to a path that matches the Request URL that was configured
app.use('/slack/events', announcements.middleware());

announcements.getAll();
announcements.listen();
// Start the express application
app.get('/slack/announcements', announcements.get);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});