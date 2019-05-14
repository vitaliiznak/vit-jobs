import {
    Button, Form, Input,
} from 'antd'
import React from 'react'

const { TextArea } = Input

interface IProps {
    form: any
}

class NormalLoginForm extends React.Component<IProps, any> {
    public handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    public render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <TextArea placeholder='Autosize height with minimum and maximum number of lines' autosize={{ minRows: 2, maxRows: 6 }} />,
                    )}
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='primary' htmlType='submit' >
                        LEAVE A NOTE
                    </Button>
                </div>
            </Form>
        )
    }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm)
