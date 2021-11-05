const express = require('express');
const dbHelperClass = require('../models/dbHelper');

const router = express.Router();

/* GET */
router.get("/", (req, res) => {
    dbHelperClass.findAllCards()
    .then(cards => {
        res.status(200).json(cards);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive cards."});
    })
});

router.get("/:id", (req, res) => {
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

/* DELETE */
router.delete("/:id", (req, res) => {
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

router.delete("/", (req, res) => {
    dbHelperClass.removeAllCards()
    .then(count => {
        if(count > 0){
            res.status(200).json({message: "Cards successfully deleted."});
        } else {
            res.status(404).json({message: "Unable to locate cards."});
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

module.exports = router;

