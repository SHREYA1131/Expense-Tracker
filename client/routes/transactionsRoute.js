const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();
const moment = require('moment');

router.post('/add-transaction', async function (req, res) {
    try {
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send('Transaction added Successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/edit-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndUpdate({_id: req.body.transactionId} , req.body.payload)

        res.send('Transaction updated Successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/delete-transaction', async function (req, res) {
    try {
        await Transaction.findOneAndDelete({_id: req.body.transactionId})

        res.send('Transaction updated Successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/get-all-transactions', async (req, res) => {
    const { frequency, selectedRange,type } = req.body;
    try {
        const transactions = await Transaction.find(
            {
                ...(frequency !== 'custom' ? {
                    date: {
                        $gt: moment().subtract(Number(req.body.frequency), 'd').toDate(),
                    },
                } : {
                    date: {
                        $gte: selectedRange[0],
                        $lte: selectedRange[1]
                    },
                }),
                userid: req.body.userid,
                ...(type!=='all' && {type})
            });
        res.send(transactions)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;