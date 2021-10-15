const express = require('express');
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

    companiesDbHelper.findById(id)
    .then(company => {
        if(company){
            res.status(200).json(company);
        } else {
            res.status(404).json({message: "Company does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});

/*server.get("/api/cards", (req, res) => {
    companiesDbHelper.find()
    .then(cards => {
        res.status(200).json(cards);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive cards."});
    })
});

server.get("/api/cards/:id", (req, res) => {
    const { id } = req.params;

    companiesDbHelper.findById(id)
    .then(card => {
        if(card){
            res.status(200).json(card);
        } else {
            res.status(404).json({message: "Card does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});*/

/* POST */
server.post("/api/companies", (req, res) => {
    companiesDbHelper.add(req.body)
    .then(company => {
        res.status(200).json(company);
    })
    .catch(error => {
        res.status(500).json({message: "Connot add company."});
    })
});

/*server.post("/api/cards", (req, res) => {
    companiesDbHelper.add(req.body)
    .then(card => {
        res.status(200).json(card);
    })
    .catch(error => {
        res.status(500).json({message: "Connot add card."});
    })
});*/

/* DELETE */
server.delete("/api/companies/:id", (req, res) => {
    const { id } = req.params;

    companiesDbHelper.remove(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted."});
        } else {
            res.status(404).json({message: "Unable to locate record."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});

/*server.delete("/api/cards/:id", (req, res) => {
    const { id } = req.params;

    companiesDbHelper.remove(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted."});
        } else {
            res.status(404).json({message: "Unable to locate record."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});*/

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
