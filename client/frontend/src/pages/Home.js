import { AutoComplete, DatePicker, message, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddEditTransaction from '../components/AddEditTransaction';
import DefautLayout from '../components/DefautLayout'
import Spinner from '../components/Spinner';
import '../resources/transactions.css'
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined , EditOutlined , DeleteOutlined} from '@ant-design/icons';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

function Home() {
  const [selectedItemForEdit , setSelectedItemForEdit] = useState(null);
  //const [selectedItemForDelete , setSelectedItemForDelete] = useState(null);
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [loading, setloading] = useState(false)
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedRange, setSelectedRange] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [viewType, setViewType] = useState('table');
  const [type, setType] = useState('all');

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("sg-money-user"));
      setloading(true)

      const response = await axios.post('/api/transactions/get-all-transactions', 
        { userid: user._id, frequency, ...(frequency === 'custom' && { selectedRange }), type });

      console.log(response.data);
      setTransactionsData(response.data);
      setloading(false)

    } catch (error) {
      setloading(false)
      message.error("something went wrong");
    }
  }

  const deleteTransaction = async (record) => {
    try {
      setloading(true);
      await axios.post('/api/transactions/delete-transaction', 
        { transactionId : record._id}
      );
      message.success("transaction deleted successfully");
      getTransactions()
      setloading(false);
    } catch (error) {
      setloading(false)
      message.error("something went wrong");
    }
  }

  useEffect(() => {
    getTransactions()
  }, [frequency, selectedRange, type]);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record)=>{
        return <div>
          <EditOutlined onClick={()=>{
            setSelectedItemForEdit(record)
            setShowAddEditTransactionModal(true)
            setSelectedItemForEdit={selectedItemForEdit}
            getTransactions={getTransactions}
          }} />
          <DeleteOutlined className="mx-3" onClick={()=>deleteTransaction(record)} />
        </div>
      }
    }
  ];

  return (
    <DefautLayout>
      {loading && <Spinner />}

      <div className="filter d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 1 week</Select.Option>
              <Select.Option value='30'>Last 1 month</Select.Option>
              <Select.Option value='365'>Last 1 year</Select.Option>
              <Select.Option value='custom'>Custom range</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className='mt-2'>
                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
              </div>
            )}
          </div>

          <div className='d-flex flex-column mx-5'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value='all'>All </Select.Option>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>

          </div>

        </div>

        <div className='d-flex'>
          <div>
            <div className='view-switch mx-5' >
              <UnorderedListOutlined className={`mx-3 ${viewType === 'table' ? 'active-icon' : 'inactive-icon'}`} 
              onClick={()=>setViewType('table')} size={30} />
              <AreaChartOutlined className={`${viewType === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
              onClick={()=>setViewType('analytics')} size={30} />
            </div>
          </div>
          <button className="primary" onClick={() => setShowAddEditTransactionModal(true)}>
            ADD NEW
          </button>
        </div>

      </div>


      <div className="table-analtics">
        {viewType==='table'? <div className="table">
          <Table columns={columns} dataSource={transactionsData} />
        </div>:<Analytics transactions={transactionsData} />}
      </div>

      {showAddEditTransactionModal && (
      <AddEditTransaction
        showAddEditTransactionModal={showAddEditTransactionModal}
        setShowAddEditTransactionModal={setShowAddEditTransactionModal}
        getTransactions={getTransactions}
        selectedItemForEdit={selectedItemForEdit}
        setSelectedItemForEdit={setSelectedItemForEdit}
      />
      )};

    </DefautLayout>
  )
}
export default Home
