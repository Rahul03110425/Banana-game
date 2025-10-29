// Import the express module
const express = require('express');
const axios = require('axios')
const cors = require('cors')

// Create an Express application
const app = express();
app.use(cors());

// Define a route (GET request) for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/quiz', async (req, res) => {
    try {
        const response = await axios.get('https://marcconrad.com/uob/banana/api.php?out=json');
        
        res.json(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data');
      } 
})

// Set the port where the app will listen
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

