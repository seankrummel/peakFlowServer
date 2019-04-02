'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {PORT, CLIENT_ORIGIN} = require('./config');

const app = express();
const jsonParser = bodyParser.json();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
app.use(cors({origin: CLIENT_ORIGIN}));
app.use(jsonParser);

app.use((req, res) => {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message, error: err});
});

function runServer(port = PORT) {
  const server = app.listen(port, () => console.info(`App listening on ${this.address().port}`))
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  runServer();
}

module.exports = {app};
