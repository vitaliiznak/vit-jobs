import { Button, Layout } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
const { Header } = Layout

export default ({ style = {} }) => (

    <Header style={style} >
        <Link to='/' style={{ fontSize: '20px' }}>
            Z-Jobs
        </Link>
        <Button type='primary' ghost={true}>LOGOUT</Button>
    </Header >)
