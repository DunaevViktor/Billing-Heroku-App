const express = require('express');
const dbHelperClass = require('./models/dbHelper');
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
    dbHelperClass.findAllCompanies()
    .then(companies => {
        res.status(200).json(companies);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive companies."});
    })
});

server.get("/api/companies/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.findCompanyById(id)
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

server.get("/api/cards", (req, res) => {
    dbHelperClass.findAllCards()
    .then(cards => {
        res.status(200).json(cards);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive cards."});
    })
});

server.get("/api/cards/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.findCardById(id)
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
});

server.get("/api/companies/:id/cards", (req, res) => {
    const { id } = req.params;

    dbHelperClass.findCardByCompany(id)
    .then(cards => {
        res.status(200).json(cards);
    })
    .catch(error => {
        res.status(500).json({message: "Error retrieving cards."});
    })
})

/* POST */
server.post("/api/companies", (req, res) => {
    dbHelperClass.addCompany(req.body)
    .then(company => {
        res.status(200).json(company);
    })
    .catch(error => {
        res.status(500).json({message: "Connot add company."});
    })
});

server.post("/api/companies/:id/cards", (req, res) => {
    const { id } = req.params;
    const msg = req.body;

    if(!msg.Company_Id){
        msg["Company_Id"] = parseInt(id, 10);
    }

    dbHelperClass.findCompanyById(id)
    .then(company => {
        if(!company){
            res.status(404).json({message: "Invalid id."});
        }

        if(!msg.FirstName || !msg.LastName || !msg.CardNumber){
            res.status(400).json({message: "Must provide required fields."});
        }

        dbHelperClass.addCard(msg, id)
        .then(card => {
            if(card){
                res.status(200).json(card);
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to add card."});
        })
    })
    .catch(error => {
        res.status(500).json({message: "Error finding company."});
    })
});

/* DELETE */
server.delete("/api/companies/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.removeCompany(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: `Company with id - ${id} successfully deleted.`});
        } else {
            res.status(404).json({message: "Unable to locate record."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});

server.delete("/api/cards/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.removeCard(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: `Card with id - ${id} successfully deleted.`});
        } else {
            res.status(404).json({message: "Unable to locate record."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});

/* PATCH */
server.patch("/api/companies/:id", (req, res) => {
    const { id } = req.params;
    let changes = req.body;

    dbHelperClass.updateCompany(id, changes)
    .then(company => {
        if(company){
            res.status(200).json(company);
        } else {
            res.status(404).json({message: "Company does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error updating record."});
    })
});

server.patch("/api/cards/:id", (req, res) => {
    const { id } = req.params;
    let changes = req.body;

    dbHelperClass.updateCard(id, changes)
    .then(card => {
        if(card){
            res.status(200).json(card);
        } else {
            res.status(404).json({message: "Card does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error updating record."});
    })
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
