const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let { username, password } = req.body;
  for (let user of users) {
    if (user.username === username) {
      return res.status(400).json({message: "Username already exists"});
    }
  }
  if (username && password) {
    users.push({username:username,password:password});
    return res.status(201).json({message: "User registered successfully"});
  } else {
    return res.status(400).json({message: "Username and password required"});
  }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message: "ISBN not found"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let results = [];
  for (let isbn in books) {
    if (books[isbn].author.toLowerCase() == req.params.author.toLowerCase()) {
      results.push(books[isbn]);
    }
  }
  return res.status(200).json(results);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let results = [];
  for (let isbn in books) {
    if (books[isbn].title.toLowerCase() == req.params.title.toLowerCase()) {
      results.push(books[isbn]);
    }
  }
  return res.status(200).json(results);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]["reviews"]);
  }
  return res.status(404).json({message: "ISBN not found"});
});

module.exports.general = public_users;
