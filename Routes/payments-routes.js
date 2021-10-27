const express = require('express');
const dbHelperClass = require('../models/dbHelper');

const router = express.Router();

/* GET */
router.get("/", (req, res) => {
    dbHelperClass.findAllPayments()
    .then(payments => {
        res.status(200).json(payments);
    })
    .catch(error => {
        res.status(500).json({message: "Unable to retrive payments."});
    })
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.findPaymentById(id)
    .then(payment => {
        if(payment){
            res.status(200).json(payment);
        } else {
            res.status(404).json({message: "Payment does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Unable to perform operation."});
    })
});

/* DELETE */
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    dbHelperClass.removePayment(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: `Payment with id - ${id} successfully deleted.`});
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

    dbHelperClass.updatePayment(id, changes)
    .then(payment => {
        if(payment){
            res.status(200).json(payment);
        } else {
            res.status(404).json({message: "Payment does not exist."});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error updating record."});
    })
});

module.exports = router;
