const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser')

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'db'
});

connection.connect();

const person = {
  name: 'Pedro'
};

connection.query('INSERT INTO people SET ?', person, (error, results, fields) => {
  if (error) {
    console.error('Error inserting:', error);
    return;
  }
  console.log('Inserted successfully');
});

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  let output = '<h1>Full Cycle Rocks!</h1>';
  connection.query('SELECT id, name FROM people', (err, results) => {
    output += '<ul>';
    results.forEach(person => {
      output += `<li>${person.name}</li>`;
    });
    output += '</ul>';
    res.send(output);
  });
});


app.post('/people', (req, res) => {
  console.log(req)
  const name = req.body.name;
  connection.query('INSERT INTO people (name) VALUES (?)', [name], (err, result) => {
    res.send(`created`);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});