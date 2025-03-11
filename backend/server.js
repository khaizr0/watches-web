const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'watchesData.json');

app.get('/api/watches', (req, res) => {
  console.log('GET /api/watches');
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read data:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/watches', (req, res) => {
  console.log('POST /api/watches', req.body);
  const newWatch = req.body;
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read data:', err);
      return res.status(500).json({ error: 'Failed to read data' });
    }
    const watches = JSON.parse(data);
    watches.push(newWatch);
    fs.writeFile(dataFilePath, JSON.stringify(watches, null, 2), (err) => {
      if (err) {
        console.error('Failed to save data:', err);
        return res.status(500).json({ error: 'Failed to save data' });
      }
      res.status(201).json(newWatch);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
