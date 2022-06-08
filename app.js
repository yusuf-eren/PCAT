const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port} adresinde başlatıldı`);
});
