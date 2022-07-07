import { Progress } from 'antd';
import React from 'react'
import '../resources/analytics.css'
function Analytics({transactions}) {
 console.log(transactions);
  const totalTransactions = transactions.length;
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type === 'income');
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type === 'expense');
  const totalIncomeTransactionsPercentage = (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;
 
  const totalTurnover = transactions.reduce((acc, transaction) => acc+ transaction.amount, 0);
  console.log(totalTurnover);
  const totalIncomeTurnover = transactions.filter((transaction)=>transaction.type==='income').reduce((acc, transaction) => acc+ transaction.amount, 0);
  const totalExpenseTurnover = transactions.filter((transaction)=>transaction.type==='expense').reduce((acc, transaction) => acc+ transaction.amount, 0);
  const totalIncomeTurnoverPercentage = (totalIncomeTurnover/ totalTurnover) * 100;
  const totalExpenseTurnoverPercentage = (totalExpenseTurnover/ totalTurnover) * 100;
  return (
    <div className='analytics'>
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions:{totalTransactions}</h4>
            <hr/>
            <h5>Income:{totalIncomeTransactions.length}</h5>
            <h5>Expense:{totalExpenseTransactions.length}</h5>
            <div className='progress-bars'>
              <Progress className="mx-5" strokeColor="green" type='circle' percent={totalIncomeTransactionsPercentage.toFixed(0)} />
              <Progress strokeColor="red" type='circle' percent={totalExpenseTransactionsPercentage.toFixed(0)} />
            </div>       
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="transactions-count ">
            <h4>Total turnover:{totalTurnover}</h4>
            <hr/>
            <h5>Income:{totalIncomeTurnover}</h5>
            <h5>Expense:{totalExpenseTurnover}</h5>
            <div className='progress-bars'>
              <Progress className="mx-5" strokeColor="green" type='circle' percent={totalIncomeTurnoverPercentage.toFixed(0)} />
              <Progress strokeColor="red" type='circle' percent={totalExpenseTurnoverPercentage.toFixed(0)} />
            </div>       
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics