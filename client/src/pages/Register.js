import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Register() {
    const [loading , setLoading]=useState(false)
    const navigate =useNavigate(true); 
    const onFinish=async(values)=>{
        console.log(values);
        try{
            setLoading(true)
            await axios.post('/api/users/register',values);
            message.success('User created');     
            setLoading(false)         
        }
        catch(err){
            console.log(err.response.data);
            setLoading(false)
        }
    } 
    useEffect(()=>{
        if(localStorage.getItem('sg-money-user')){
            navigate('/')
        }
    },[])

  return (
    <div className='register'>
        {loading && <Spinner/>}
        
        <div className="row justify-content-center align-items-center w-100 h-100">
            <div className='col-md-5'>
            <div className='lottie'><lottie-player src="https://assets3.lottiefiles.com/packages/lf20_xmt41vik.json"  background="transparent"  speed="1"    loop autoplay></lottie-player></div>
            </div>
            <div className='col-md-4'>
                <Form layout='vertical' onFinish={onFinish}>
                <h1>SG-MONEY/REGISTER</h1>
               
                    <Form.Item label='Name' name='name'>
                        <Input/>
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                    <Input type="password"/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to='/login'>Already Registered,click here to login</Link>
                         <button className='primary' type="submit">Register</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default Register

