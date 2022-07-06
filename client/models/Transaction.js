const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount : {type: string , required: true},
    type: {type: string, required: true},
    category : {type: string , required: true},
    reference: {type: string, required: true},
    description: {type: string, required: true},
    date: {type: string, required: true}
});

const transactionModel=mongoose.model('Transactions',transactionSchema);

module.exports=transactionModel;
