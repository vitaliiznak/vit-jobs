import { Button, Form, Icon, Input, message, Upload } from 'antd'
import { EditorState } from 'draft-js'
import React from 'react'
import * as styles from './styles.module.css'

const { TextArea } = Input

const { Dragger } = Upload

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg' || file.type === 'png'
  if (!isJPG) {
    message.error('You can only upload JPG or PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJPG && isLt2M
}

const propsDragger = {
  name: 'file'
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

interface IProps {
  form: any
  style?: any
  className?: string
  isPreview?: boolean
}
interface Istate {
  editorState: Object
  imageUrl: string
  loading: boolean
}
class ApplicationForm extends React.Component<IProps, Istate> {
  public state = {
    editorState: EditorState.createEmpty(),
    imageUrl: '',
    loading: false
  }

  private onSubmit = (e) => {
    e.preventDefault()
    const { isPreview } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log('Received values of form: ', values)
        return
      }
      if (isPreview) {
        return
      }
      // fetch
    })
  }

  public render() {
    const {
      style,
      className,
      form: { getFieldDecorator }
    } = this.props
    const { imageUrl } = this.state
    const uploadButton = <div>Upload Image</div>

    return (
      <Form
        className={className}
        style={style}
        onSubmit={this.onSubmit}
        method='POST'
      >
        <div style={{ display: 'flex' }}>
          {getFieldDecorator('image', {
            rules: [{}]
          })(
            <Upload
              name='avatar'
              listType='picture-card'
              showUploadList={false}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt='avatar'
                  style={{ height: '100px', width: '100px' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          )}
          <div style={{ flex: 1 }}>
            <Form.Item
              {...formItemLayout}
              style={{ flex: 1 }}
              label='First name'
            >
              {getFieldDecorator('firstName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name!'
                  }
                ]
              })(<Input style={{ width: '100%' }} placeholder='first name' />)}
            </Form.Item>
            <div style={{ width: '10px' }} />
            <Form.Item
              {...formItemLayout}
              style={{ flex: 1 }}
              label='Last name'
            >
              {getFieldDecorator('lastName', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name!'
                  }
                ]
              })(<Input style={{ width: '100%' }} placeholder='last name' />)}
            </Form.Item>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Form.Item style={{ flex: 1 }} label='Email'>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input email' }]
            })(<Input style={{ width: '100%' }} placeholder='last name' />)}
          </Form.Item>
          <div style={{ width: '10px' }} />

          <Form.Item style={{ flex: 1 }} label='Phone number'>
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: 'Select county' }]
            })(<Input style={{ width: '100%' }} placeholder='+351' />)}
          </Form.Item>
        </div>
        <Form.Item style={{ flex: 1 }} label='Cover Letter'>
          {getFieldDecorator('coverLetter', {
            rules: [{ required: true, message: 'Select county' }]
          })(<TextArea />)}
        </Form.Item>
        <Form.Item
          style={{ flex: 1 }}
          label={<h3 style={{ display: 'inline-block' }}>Curriculum Vitae</h3>}
        >
          {getFieldDecorator('cv', {})(
            <Dragger {...propsDragger}>
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          )}
        </Form.Item>
        <div style={{ display: 'flex', marginTop: '18px' }}>
          <Button
            type='primary'
            htmlType='submit'
            ghost={true}
            style={{ marginLeft: 'auto' }}
          >
            APPLY
          </Button>
        </div>
      </Form>
    )
  }
}

export default Form.create<IProps>()(ApplicationForm)
