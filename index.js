const express = require('express');
const shortid = require('shortid');
const companiesDbHelper = require('./models/dbHelper');
const server = express();

const PORT = process.env.PORT || 5000;
let companies = [];
let cards = [];
//let payments = [];

server.use(express.json());

/* Heroku app return */
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

/* GET */
server.get("/api/companies", (req, res) => {
    //res.status(200).json(companies);
    companiesDbHelper.find()
    .then(companies => {
        res.status(200).json(companies);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive companies."});
    })
});

server.get("/api/companies/:id", (req, res) => {
    const { id } = req.params;
    const found = companies.find(company => company.id === id);

    if(found){
        res.status(200).json(found);
    } else {
        res.status(404).json({message: "Company does not exist."});
    }
});

server.get("/api/cards", (req, res) => {
    res.status(200).json(cards);
});

server.get("/api/cards/:id", (req, res) => {
    const { id } = req.params;
    const found = cards.find(card => card.id === id);

    if(found){
        res.status(200).json(found);
    } else {
        res.status(404).json({message: "Card does not exist."});
    }
});

/* POST */
server.post("/api/companies", (req, res) => {
    /*const companyInfo = req.body;
    companyInfo.id = shortid.generate();
    companies.push(companyInfo);

    res.status(201).json(companyInfo);*/
    companiesDbHelper.add(req.body)
    .then(company => {
        res.status(200).json(company);
    })
    .catch(error => {
        res.status(500).json({message: "Connot add company."});
    })
});

server.post("/api/cards", (req, res) => {
    const cardInfo = req.body;
    cardInfo.id = shortid.generate();
    cards.push(cardInfo);

    res.status(201).json(cardInfo);
});

/* DELETE */
server.delete("/api/companies/:id", (req, res) => {
    const { id } = req.params;

    const deleted = companies.find(company => company.id === id);
    if(deleted){
        companies = companies.filter(company => company.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: "No company with this id in database."});
    }
});

server.delete("/api/cards/:id", (req, res) => {
    const { id } = req.params;

    const deleted = cards.find(card => card.id === id);
    if(deleted){
        cards = cards.filter(card => card.id !== id);
        res.status(200).json(deleted);
    } else {
        res.status(404).json({message: "No card with this id in database."});
    }
});

/* PUT */
server.put("/api/companies/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    const index = companies.findIndex(company => company.id === id);
    if(index !== -1){
        companies[index] = changes;
        res.status(200).json(companies[index]);
    } else {
        res.status(404).json({message: "Company does not exist."});
    }
});

server.put("/api/cards/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    const index = cards.findIndex(card => card.id === id);
    if(index !== -1){
        cards[index] = changes;
        res.status(200).json(cards[index]);
    } else {
        res.status(404).json({message: "Card does not exist."});
    }
});

/* PATCH */
server.patch("/api/companies/:id", (req, res) => {
    const { id } = req.params;
    let changes = req.body;

    const found = companies.find(company => company.id === id);
    if(found){
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({message: "Company does not exist."});
    }
});

server.patch("/api/cards/:id", (req, res) => {
    const { id } = req.params;
    let changes = req.body;

    const found = cards.find(card => card.id === id);
    if(found){
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({message: "Card does not exist."});
    }
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
