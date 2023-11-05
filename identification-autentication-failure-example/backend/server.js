// Written by: Marc Malonzo
// Backend server for identification/autentication failure example

const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const app = express();
app.use(json());
app.use(cors());

// Starting Data
data = {
  users: [
    {
      "email": "bob@email.com",
      "password": "bobspassword123",
      "uid": "1"
    }
  ]
}

/**
 * Gets data from database.
 * @returns data object
 */
function getData() {
  return data;
}

/**
 * Sets data to new data.
 * @param {Object} newData 
 */
function setData(newData) {
  data = newData;
}

/**
 * Function used to authenticate a user.
 * @param {String} email 
 * @param {String} password 
 * @returns user's uid if login is successful
 */
function login(email, password) {
  let data = getData();
  let user = Object.values(data.users).find(user => user.email === email);
  if (user && user.password === password) {
    return user.uid;
  }
}

/**
 * Function used to register a user.
 * @param {String} email 
 * @param {String} password 
 * @returns user's uid if registration is successful.
 */
function register(email, password) {
  let data = getData();
  let uid = Object.keys(data.users).length + 1;
  data.users.push({ "email": email, "password": password, "uid": uid });
  setData(data);
  return uid;
}

/**
 * Recovers user's password if email exists in database.
 * @param {String} email 
 * @returns user's password if email is found.
 */
function getPassword(email) {
  let data = getData();
  let user = Object.values(data.users).find(user => user.email === email);
  if (user) {
    return user.password;
  }
}

// Routes
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    res.json(register(email, password));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    res.json(login(email, password));
});

app.get('/get-password', (req, res) => {
    const { email } = req.query;
    res.json(getPassword(email));
});

app.listen(3000, () => console.log('Server started on port 3000'));