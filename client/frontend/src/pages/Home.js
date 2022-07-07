
import { AutoComplete, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddEditTransaction from '../components/AddEditTransaction';
import DefautLayout from '../components/DefautLayout'
import Spinner from '../components/Spinner';
import '../resources/transactions.css'

function Home() {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
    const [loading , setloading]=useState(false)
    const [ transactionsData , setTransactionsData] = useState([]);
    const getTransactions=async()=>{
      try {
        const user = JSON.parse(localStorage.getItem("sg-money-user"));
        setloading(true)
        const response=await axios.post('/api/transactions/get-all-transactions',{userid : user._id});
        console.log(response.data);
        setTransactionsData(response.data);
        setloading(false)
    } catch (error) {
        setloading(false)
        message.error("something went wrong");
    }
    }
    
    useEffect(()=>{
      getTransactions()
    }, []);

  return (
    <DefautLayout>
      {loading && <Spinner/>}
      <div className="filter d-flex justify-content-between align-items-center">
        <div>

        </div>

        <div>
          <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}> 
            ADD NEW
          </button>
        </div>

      </div>


      <div className="table-analtics">

      </div>

      {showAddEditTransactionModal && (<AddEditTransaction
      showAddEditTransactionModal={showAddEditTransactionModal} 
      setShowAddEditTransactionModal={setShowAddEditTransactionModal} 
      />)}; 

    </DefautLayout>
  )
}
export default Home
