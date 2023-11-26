const express = require('express');
const app = express();
require('dotenv').config()

let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
let posts = {
    1: {
      id: '1',
      title: 'First post',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      title: 'Second post',
      text: 'By World',
      userId: '2',
    },
};

app.get('/users', (req, res) => {
    return res.send(Object.values(users));
});
  
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.post('/users/:userId', (req, res) => {
    return res.send('POST HTTP method on user resource');
});
  
app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});
  
app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.get('/posts', (req, res) => {
    return res.send(Object.values(posts));
  });
  
app.get('/posts/:postId', (req, res) => {
    return res.send(posts[req.params.postId]);
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});