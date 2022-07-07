import React, { useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTransaction(props) {            //showAddEditTransactionModal, setShowAddEditTransactionModal, 
    const [loading , setLoading]=useState(false)

    const onFinish=async(values)=>{ 
        console.log(values);
        try{
          const user = JSON.parse(localStorage.getItem("sg-money-user"));
            setLoading(true);
            await axios.post('/api/transactions/add-transaction' , {...values , userid : user._id,});
            props.getTransactions();
            message.success('transaction added successfully'); 
            props.setShowAddEditTransactionModal(false);    
            setLoading(false);         
        }
        catch(err){
            console.log(err);
            setLoading(false) 
        }
    }; 
    return (
    <Modal title="Add Transaction" 
        visible={props.showAddEditTransactionModal} 
        onCancel={()=>props.setShowAddEditTransactionModal(false)}
        footer={false}
        > 
          {loading && <Spinner/>}
          <Form layout="vertical" className='transaction-form' onFinish={onFinish}>

            <Form.Item label="Amount" name="amount">
              <Input type="test"/>
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item label="Category" name="category">
              <Select>
                {" "}
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="freelance">Freelance</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>

            
            <Form.Item label="Date" name="date">
              <Input type="date"/>
            </Form.Item>

            <Form.Item label="Reference" name="reference">
              <Input type="text"/>
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input type="text"/>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <button className="primary" type="submit">SAVE</button>
            </div>

          </Form> 
        </Modal>
  )
}

export default AddEditTransaction