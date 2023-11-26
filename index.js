const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
});
  
app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});
  
app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});
  
app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(3000, () => {
    console.log(`App listening on port 3000`);
});