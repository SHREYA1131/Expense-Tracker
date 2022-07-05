import React from 'react'
import { Spin } from 'antd';

function Spinner() {
    return (
        <div className="spinner"> 
            <Spin color="grey" style={{color:"grey"}} size='large'/>
            </div>
    )
}

export default Spinner