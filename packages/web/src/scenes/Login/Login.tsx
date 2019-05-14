import {
  Button, Form, Icon, Input, Layout,
} from 'antd'
import React from 'react'

import * as styles from './styles.module.css'

const { Content } = Layout

const styleFormWrapper = { maxWidth: '500px', marginTop: '20vh' }

interface IProps {
  form: any
}
interface Istate {

}
class SignUp extends React.Component<IProps, Istate> {
  public handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }
      // fetch
      fetch(`${process.env.REACT_APP_API_URI_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Layout className={styles.index}>
        <Content style={styleFormWrapper}>
          <Form onSubmit={this.handleSubmit} method='POST' action='/auth/login'>
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
              <Button type='primary' htmlType='submit'>
                Log in
              </Button>
              <br />
              Or <a href='/'>register now!</a>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    )
  }
}

export default Form.create()(SignUp as any)
