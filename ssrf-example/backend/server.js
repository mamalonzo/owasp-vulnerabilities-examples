// Written by Marc Malonzo
// This file contains the backend code for the SSRF example

import cors from 'cors';

const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

/**
 * Route that fetches data from bitcoin API.
 * A user may also perform SSRF by changing the url query parameter to a different URL.
 */
app.get('/getBitcoinPrice', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url);
    const bitcoinData = response.data;
    console.log(bitcoinData);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(bitcoinData));
    res.end();
  } catch (error) {
    res.status(500).send('An error occurred getting Bitcoin API data');
  }
});

/**
 * A secret function that user's should not be able to access.
 * If you use an intercepter or repeater to change the request to /admin/secret
 * you will be able to see the contents secret file.
 */
app.get('/admin/secret', (req, res) => {
  const filePath = 'secret-file.txt';

  fs.readFile(filePath, 'utf8', (error,data) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Error reading file');
    }

    res.status(200).send(data);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});