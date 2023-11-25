const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use('/user', routes.user);

app.get('/', (req, res) => {
    res.send('hi');
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});