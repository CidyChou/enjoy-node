const express = require('express');
const app = express();
const port = 8090;

app.get('/', (req, res) => {
    res.send('EXPRESS');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
  