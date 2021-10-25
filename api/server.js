const express = require('express');
const companiesRouter = require('../Routes/companies-routes');
const cardsRouter = require('../Routes/cards-routes');
const paymentsRouter = require('../Routes/payments-routes');

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.end(`
        <h1 align="center"> Heroku app return </h1>
        <div align="center">
            <nav>
                <a href="/">Return Home</a>
            </nav>
        </div>
    `);
});

server.use('/api/companies', companiesRouter);
server.use('/api/cards', cardsRouter);
server.use('/api/payments', paymentsRouter);

module.exports = server;
