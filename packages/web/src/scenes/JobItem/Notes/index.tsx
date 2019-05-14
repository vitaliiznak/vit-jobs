import {
    Button, Checkbox, Form, Icon, Input,
} from 'antd'
import React from 'react'
import NoteAdd from './NoteAdd'

class NormalLoginForm extends React.Component {
    public render() { return <div style={{ maxWidth: '600px', margin: '20px 20px 20px 40px' }}><NoteAdd /></div> }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm)
