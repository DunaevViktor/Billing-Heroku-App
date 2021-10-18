const express = require('express');
const dbHelperClass = require('../models/dbHelper');

const router = express.Router();

/* GET */
router.get("/", (req, res) => {
    dbHelperClass.findAllCompanies()
    .then(companies => {
        res.status(200).json(companies);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive companies."});
    })
});

router.get("/:id", (req, res) => {
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

router.get("/:id/cards", (req, res) => {
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
router.post("/", (req, res) => {
    dbHelperClass.addCompany(req.body)
    .then(company => {
        res.status(200).json(company);
    })
    .catch(error => {
        res.status(500).json({message: "Connot add company."});
    })
});

router.post("/:id/cards", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

/* PATCH */
router.patch("/:id", (req, res) => {
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

module.exports = router;
