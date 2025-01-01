const express = require('express');
const bodyParser = require('body-parser');
const scrapeTwitterTrending = require('./scripts/script');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/run-script', async (req, res) => {
  try {
    const result = await scrapeTwitterTrending();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error running script');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
