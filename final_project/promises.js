const axios = require('axios');
const BASE_URL = 'http://localhost:5001';

//Task 10
//node -e "require('./promises.js').getBookList().then(books => console.log(books));"
const getBookList = async () => {
    const response = await axios.get(BASE_URL + '/');
    return response.data;
}

//Task 11
//node -e "require('./promises.js').getBook(1).then(books => console.log(books));"
const getBook = async (isbn) => {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
}

//Task 12
//node -e "require('./promises.js').getBookWithAuthor('Unknown').then(books => console.log(books));"
const getBookWithAuthor = async (author) => {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
}

//Task 13
//node -e "require('./promises.js').getBookWithTitle('The Epic Of Gilgamesh').then(books => console.log(books));"
const getBookWithTitle = async (title) => {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
}

module.exports.getBookList = getBookList;
module.exports.getBookWithAuthor = getBookWithAuthor;
module.exports.getBookWithTitle = getBookWithTitle;
module.exports.getBook = getBook;
