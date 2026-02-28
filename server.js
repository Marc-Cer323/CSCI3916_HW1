'use strict';

const express = require('express');
const app = express();

// Capture raw body for all content types as a Buffer
app.use(express.raw({ type: '*/*' }));

app.post('/', (req, res) => {
  const contentType = req.headers['content-type'] || 'text/plain';
  const body = req.body; // Buffer | undefined

  res.set('Content-Type', contentType);
  res.status(200).send(body !== undefined ? body : Buffer.alloc(0));
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Echo server listening on port ${PORT}`);
  });
}

module.exports = app;
