const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = 'Your_API_KEY'; // Replace with your actual API key

app.get('/news', async (req, res) => {
  const country = req.query.country || 'us'; // Default to 'us'
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching news');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
