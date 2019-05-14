import React from 'react'
import { Checkbox, Form, Button } from 'antd'
import { withRouter } from 'react-router'
// tslint:disable-next-line: no-submodule-imports

interface IProps {
  form: any
  style?: any
  className?: string
}
interface Istate {}
class ApplicationPreview extends React.Component<IProps, Istate> {
  private onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }

      // fetch
    })
  }

  public render() {
    const {
      form: { getFieldDecorator },
      style,
      className
    } = this.props
    return (
      <Form
        className={className}
        style={style}
        onSubmit={this.onSubmit}
        method='POST'
      >
        <Form.Item>
          {getFieldDecorator('emailIsRequired', {
            initialValue: true,
            valuePropName: 'checked'
          })(<Checkbox>Email is required</Checkbox>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phoneNumberIsRequired', {
            initialValue: true,
            valuePropName: 'checked'
          })(<Checkbox>Phone is required</Checkbox>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('coverLetterRequiredIsRequired', {
            initialValue: true,
            valuePropName: 'checked'
          })(<Checkbox>Cover letter is required</Checkbox>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('CVRequiredIsRequired', {
            initialValue: true,
            valuePropName: 'checked'
          })(<Checkbox>Curriculum Vitae is required</Checkbox>)}
        </Form.Item>
        <div style={{ display: 'flex', marginTop: '18px' }}>
          <Button
            type='primary'
            htmlType='submit'
            ghost={true}
            style={{ marginLeft: 'auto' }}
          >
            SAVE & NEXT
          </Button>
        </div>
      </Form>
    )
  }
}

export default withRouter(Form.create<IProps>()(ApplicationPreview))
