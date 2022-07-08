import React from 'react'
import '../resources/default-layout.css'
import { Button, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


function DefautLayout(props) {
  const user = JSON.parse(localStorage.getItem('sg-money-user'))
  const navigate = useNavigate()
  const menu = (
    <Menu
      items={[
        {
          label: (
            <li onClick={()=>{
              localStorage.removeItem('sg-money-user')
              navigate("/login")
            }}>Logout</li>
          ),
        }
      ]}
    />
  );
  
  return (
    <div className="layout">

      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">
            SG Money
          </h1>
        </div>

        <div>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <Button className="primary">{user.name}</Button>
          </Dropdown>
        </div>

      </div>

      <div className="content">
        {props.children}

      </div>

    </div>
  )
}

export default DefautLayout