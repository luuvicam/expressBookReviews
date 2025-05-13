const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
  for (let user of users) {
    if (user.username === username) {
      return true;
    }
  }
  return false;
}

const authenticatedUser = (username,password)=>{
  for (let user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let { username, password } = req.body;
  if (username && password) {
    if (authenticatedUser(username,password)) {
      const accessToken = jwt.sign({username: username}, "access", {expiresIn: "1h"});
      const refreshToken = jwt.sign({username: username}, "refresh", {expiresIn: "1d"});
      req.session.authorization = {accessToken: accessToken, refreshToken: refreshToken};
      return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
    } else {
      return res.status(401).json({message: "Invalid username or password"});
    }
  } else {
    return res.status(400).json({message: "Username and password required"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let { username } = req.user;
  if (!username) {
    return res.status(403).json({message: "User not authenticated"});
  }
  let { isbn } = req.params;
  let { review } = req.body;
  if (books[isbn]) {
    books[isbn]["reviews"][username] = review;
    return res.status(200).json(books[isbn]["reviews"]);
  }
  return res.status(404).json({message: "ISBN not found"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  let { username } = req.user;
  if (!username) {
    return res.status(403).json({message: "User not authenticated"});
  }
  let { isbn } = req.params;
  if (books[isbn]) {
    delete books[isbn]["reviews"][username];
    return res.status(200).json(books[isbn]["reviews"]);
  }
  return res.status(404).json({message: "ISBN not found"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
