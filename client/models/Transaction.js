const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid: {type: String , required: true},
    amount : {type: String , required: true},
    type: {type: String, required: true},
    category : {type: String , required: true},
    reference: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true}
});

const transactionModel=mongoose.model('Transactions',transactionSchema);

module.exports=transactionModel;
