import {
  Button, Checkbox, Form, Icon, Input, Layout,
} from 'antd'
import React from 'react'

const { Content } = Layout

interface IProps {
  form: any
}

interface Istate {

}

class SignUp extends React.Component<IProps, Istate> {
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
      <Layout>
        <Content>
          <Form onSubmit={this.handleSubmit} >
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>,
              )}
            
              <Button type='primary' htmlType='submit'>
                Log in
          </Button>
              Or <a href='/'>register now!</a>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

export default Form.create()(SignUp as any)
