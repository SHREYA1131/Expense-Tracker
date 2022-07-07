const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/add-transaction', async function (req, res) {
    try {
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send('Transaction added Successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/get-all-transactions', async(req,res)=>{
    try {
        const transactions = await Transaction.find({userid : req.body.userid});
        response.send(transactions)
    } catch (error) {
        res.status(500).json({ error: err.message });        
    }
})

module.exports = router;