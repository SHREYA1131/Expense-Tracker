import { Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios';
import Spinner from '../components/Spinner';

function Login() {
    const [loading , setloading]=useState(false)
    const navigate=useNavigate();
    const onFinish = async(values) => {
        try {
            setloading(true)
            const response=await axios.post('/api/users/login',values);
            localStorage.setItem('sg-money-user',JSON.stringify({...response.data , password:''}));
            setloading(false)
            message.success('Login Successful');
            navigate('/')
        } catch (error) {
            setloading(false)
            message.error("something wrong");
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
               
                <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>SG-MONEY/Login</h1>

                        
                       
                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Password'  name='password'>
                            <Input type="password"/>
                        </Form.Item>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register'>Not Registered,click here to register</Link>
                            <button className='primary' type="submit">Login</button>
                        </div>
                    </Form>
                </div>
                <div className='col-md-5'>
                    <div className='lottie'><lottie-player src="https://assets3.lottiefiles.com/packages/lf20_xmt41vik.json" background="transparent" speed="1" loop autoplay></lottie-player></div>
                </div>
            </div>
            
        </div>
    )
}

export default Login

