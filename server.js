const express = require('express');

const app = express();

app.use(express.json());

let users = [];
let posts = [];
let comments = [];

// REGISTER
app.post('/register', (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "user"
  };

  const existingUser = users.find(u => u.email === user.email);

  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  users.push(user);

  res.json({
    message: "User registered",
    users: users
  });
});

// LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.json({ message: "Invalid password" });
  }

  res.json({
    message: "Login successful",
    user: user
  });
});
app.post('/posts', (req, res) => {
  const { email, title, content } = req.body;

  const post = {
    email,
    title,
    content
  };

  posts.push(post);

  res.json({
    message: "Post created",
    posts: posts
  });
});
app.get('/posts', (req, res) => {
  res.json(posts);
});
app.put('/posts/:index', (req, res) => {
  const index = req.params.index;
  const { email, title, content } = req.body;

  const post = posts[index];

  if (!post) {
    return res.json({ message: "Post not found" });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  // check permission
  if (post.email !== email && user.role !== "admin") {
    return res.json({ message: "Not allowed to update this post" });
  }

  posts[index] = {
    ...post,
    title: title || post.title,
    content: content || post.content
  };

  res.json({
    message: "Post updated",
    posts: posts
  });
});
app.delete('/posts/:index', (req, res) => {
  const index = req.params.index;
  const { email } = req.body;

  const post = posts[index];

  if (!post) {
    return res.json({ message: "Post not found" });
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  // check permission
  if (post.email !== email && user.role !== "admin") {
    return res.json({ message: "Not allowed to delete this post" });
  }

  posts.splice(index, 1);

  res.json({
    message: "Post deleted",
    posts: posts
  });
});
app.post('/comments', (req, res) => {
  const { email, postIndex, text } = req.body;

  if (!posts[postIndex]) {
    return res.json({ message: "Post not found" });
  }

  const comment = {
    email,
    postIndex,
    text
  };

  comments.push(comment);

  res.json({
    message: "Comment added",
    comments: comments
  });
});
app.get('/comments/:postIndex', (req, res) => {
  const postIndex = req.params.postIndex;

  const postComments = comments.filter(
    comment => comment.postIndex == postIndex
  );

  res.json(postComments);
});
// HOME
app.get('/', (req, res) => {
  res.send('Blog API is running');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});