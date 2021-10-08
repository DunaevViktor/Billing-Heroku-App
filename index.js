const express = require('express');
const shortid = require('shortid');
const server = express();

const PORT = 5000;
const companies = [];
const cards = [];
const payments = [];

server.use(express.json());

/* GET */
server.get("/", (req, res) => {
    res.json({test1: "text1"});
});
server.get("/page1", (req, res) => {
    res.json({test2: "text2"});
});

/* POST */
server.post("/api/companies", (req, res) => {
    const companyInfo = req.body;
    companyInfo.id = shortid.generate();
    companies.push(companyInfo);

    res.status(201).json(companyInfo);
});

server.listen(5000, () => {
    console.log(`Server running on ${PORT}`);
});
