const express = require('express');
const knex = require('knex');
const path = require('path');

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } = process.env;
const app = express();
const port = 3000;
const dbClient = knex({
    client: 'mysql',
    connection: {
      host : DATABASE_HOST || 'localhost',
      user : DATABASE_USER || 'root',
      password : DATABASE_PASSWORD || 'xakdev',
      port: 3306,
      database : 'HomelessResources'
    }
});

app.use(express.json());

app.post('/api/v1/shelter/submit', async (req, res) => {
    res.send(await dbClient.insert(req.body).into('services').returning('*'));
});

app.post('/api/v1/food/submit', async (req, res) => {
    res.send(await dbClient.insert(req.body).into('services').returning('*'));
});

app.post('/api/v1/medical/submit', async (req, res) => {
    res.send(await dbClient.insert(req.body).into('services').returning('*'));
});

app.post('/api/v1/transport/submit', async (req, res) => {
    res.send(await dbClient.insert(req.body).into('services').returning('*'));
});

app.get('/api/v1/services', async (req, res) => {
    res.send(await dbClient.select('*').from('services').catch(e => console.log(e)));
})

app.use(express.static(path.join(__dirname, '..','public')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))