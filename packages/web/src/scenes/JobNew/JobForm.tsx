import React from 'react'
import {
  Button,
  Form,
  Icon,
  Input,
  InputNumber,
  Select,
  Upload,
  Divider
} from 'antd'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { graphql } from 'react-apollo'
import { Editor } from 'react-draft-wysiwyg'
import { withRouter } from 'react-router'

import { CREATE_JOB } from 'mutations'
import { getBase64 } from 'utils'

import * as styles from './jobForm.module.css'

const { Option } = Select
const { Dragger } = Upload
const { TextArea } = Input

const searchName = (input, option) =>
  (option.props.children as string).startsWith(input.toLowerCase())

const employmentTypes = {
  other: {
    title: 'Other'
  },
  full_time: {
    title: 'Full Time'
  },
  part_time: {
    title: 'Part Time'
  },
  temporary: {
    title: 'Temporary'
  },
  contract: {
    title: 'Contract'
  },
  internship: {
    title: 'Internship'
  },
  volunterr: {
    title: 'Volunteer'
  }
}

const category = {
  0: {
    title: 'Accounting'
  },
  1: {
    title: 'Executive'
  },
  2: {
    title: 'Admin & Clerical'
  },
  3: {
    title: 'Banking & Finance'
  },
  4: {
    title: 'Health Care'
  },
  5: {
    title: 'Sales & Marketing'
  },
  6: {
    title: 'Customer Service'
  },
  7: {
    title: ' Human Resources'
  },
  8: {
    title: 'Science & Biotech'
  },
  9: {
    title: 'iversity Opportunities'
  },
  10: {
    title: ' Information Technology'
  },
  11: {
    title: 'Transportation'
  },
  12: {
    title: 'Engineering'
  }
}

const education = {
  none: {
    title: 'None'
  },
  scool: {
    title: 'High Scool or equivalent'
  },
  college: {
    title: 'College/Professional coursework completed'
  },
  bachelor: {
    title: `Bachelor's degree`
  },
  masters: {
    title: `Master's degree`
  },
  phd: {
    title: 'PHD, Doctorate'
  }
}

const propsAttachmentsDragger = {
  name: 'file',
  multiple: true,
  accept: '.pdf'
}

const Space = () => <span style={{ width: '8px', display: 'inline-block' }} />

const uploadFormatter = ({ uid, lastModified, name, type, originFileObj }) => ({
  uid,
  lastModified,
  name,
  type,
  originFileObj
})

interface IProps {
  form: any
  createJob: Function
  isPreview?: boolean
  history: any
  style?: any
  className?: string
}
interface Istate {
  editorState: any
  isShowRawText?: boolean
  loading: boolean
  logoUrl: string
}
class JobNew extends React.Component<IProps, Istate> {
  public state = {
    isShowRawText: false,
    editorState: EditorState.createEmpty(),
    logoUrl: '',
    loading: false
  }

  private onTriggerShowRawText = () => {
    this.setState((state) => ({
      isShowRawText: !state.isShowRawText
    }))
  }

  private onLogoChange = async (value) => {
    const logoUrl = (await getBase64(value.file)) as string
    this.setState({
      logoUrl,
      loading: false
    })
  }

  private onEditorStateChange = (editorState) => {
    const description = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    )
    this.setState({
      editorState
    })
    this.props.form.setFieldsValue({
      description
    })
  }

  private onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        return
      }
      const {
        data: {
          createJob: { id }
        }
      } = await this.props.createJob({
        variables: {
          input: {
            ...values,
            salaryRange: values.salaryFrom
              ? [values.salaryFrom, values.salaryTo]
              : undefined,
            logo:
              values.logo &&
              values.logo.fileList.length &&
              values.logo.fileList.map(uploadFormatter)[0],
            attachments: (
              (values.attachments && values.attachments.fileList) ||
              []
            ).map(uploadFormatter)
          }
        }
      })
      this.props.history.push(`/jobs/${id}/applications/new`)
    })
  }

  public render() {
    const {
      isPreview,
      form: { getFieldDecorator, getFieldValue },
      style,
      className
    } = this.props
    const { editorState, isShowRawText, logoUrl } = this.state
    const styleDescriptionTextArea: any = {}
    if (!isShowRawText) {
      styleDescriptionTextArea.display = 'none'
    }

    return (
      <Form
        style={style}
        className={className}
        onSubmit={this.onSubmit}
        method='POST'
      >
        <div style={{ display: 'flex' }}>
          {getFieldDecorator('logo', {})(
            <Upload
              listType='picture-card'
              showUploadList={false}
              onChange={this.onLogoChange}
              beforeUpload={() => false}
              className={styles.uploadLogo}
              accept='image/*'
            >
              {logoUrl ? (
                <img src={logoUrl} alt='logo' />
              ) : (
                <div style={{ display: 'flex' }}>Upload Company Logo</div>
              )}
            </Upload>
          )}
          <Form.Item style={{ flex: 1 }} label='Title'>
            {getFieldDecorator('title', {
              rules: [
                { required: true, message: 'Please input your job title!' }
              ]
            })(<Input placeholder='Job title' />)}
          </Form.Item>
        </div>
        <Divider orientation='left'>Job Address</Divider>
        <div style={{ display: 'flex' }}>
          <Form.Item style={{ flex: 1 }} label='Country'>
            {getFieldDecorator('country', {
              rules: [{ required: true, message: 'Select county' }]
            })(<Input />)}
          </Form.Item>
          <div style={{ width: '10px' }} />
          <Form.Item style={{ flex: 1 }} label='State'>
            {getFieldDecorator('state', {
              rules: [{ required: true, message: 'Select state' }]
            })(<Input />)}
          </Form.Item>
        </div>
        <div style={{ display: 'flex' }}>
          <Form.Item style={{ flex: 1 }} label='City'>
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Select city' }]
            })(<Input />)}
          </Form.Item>
          <div style={{ width: '10px' }} />
          <Form.Item style={{ flex: 1 }} label='ZIP-Code'>
            {getFieldDecorator('zipcode', {
              rules: [{ required: true, message: 'Zip code' }]
            })(<Input />)}
          </Form.Item>
        </div>
        <Divider orientation='left'>Job details</Divider>
        <div style={{ display: 'flex' }}>
          <Form.Item style={{ flex: 1 }} label='Employment type'>
            {getFieldDecorator('employmentType', {
              rules: []
            })(
              <Select
                showSearch={true}
                placeholder='Select employment type'
                optionFilterProp='children'
                filterOption={searchName}
              >
                {Object.entries(employmentTypes).map(([key, { title }]) => (
                  <Option key={key} value={key}>
                    {title}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <div style={{ width: '10px' }} />
          <Form.Item style={{ flex: 1 }} label='Category'>
            {getFieldDecorator('category', {
              rules: []
            })(
              <Select
                showSearch={true}
                placeholder='Select job category'
                optionFilterProp='children'
                filterOption={searchName}
              >
                {Object.entries(category).map(([key, { title }]) => (
                  <Option key={key} value={key}>
                    {title}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </div>
        <div>
          <Form.Item style={{ flex: 1 }} label='Education'>
            {getFieldDecorator('edutation', {
              rules: []
            })(
              <Select
                showSearch={true}
                placeholder='Select '
                optionFilterProp='children'
                filterOption={searchName}
              >
                {Object.entries(education).map(([key, { title }]) => (
                  <Option key={key} value={key}>
                    {title}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </div>

        <div style={{ display: 'flex' }}>
          <Form.Item label='Experience'>
            {getFieldDecorator('experienceYears', {
              rules: []
            })(<InputNumber min={0} max={80} />)}{' '}
            years
          </Form.Item>

          <div style={{ width: '18px' }} />

          <Form.Item label='Hours per week'>
            {getFieldDecorator('hoursPerWeek', {
              rules: []
            })(<InputNumber min={1} max={40} />)}
            <Space />
            <span>hours/week</span>
            <Space />
          </Form.Item>
          <div style={{ width: '18px' }} />
          <div>
            <Form.Item
              style={{ flex: 1, marginBottom: '4px' }}
              label='Salary range'
            />
            <span>from</span> <Space />
            {getFieldDecorator('salaryFrom', {
              rules: []
            })(<InputNumber min={0} max={40} />)}
            <Space /> <span>to</span> <Space />
            {getFieldDecorator('salaryTo', {
              rules: []
            })(<InputNumber min={1} max={40} />)}
            <Space />
            <span>euro</span>
            <Space />
          </div>
        </div>

        <Divider orientation='left' />
        <Form.Item
          required={true}
          label={
            <h3
              style={{
                display: 'inline-block'
              }}
            >
              Description
            </h3>
          }
        >
          <Editor
            editorState={editorState}
            wrapperClassName={styles.editorWrapper}
            editorClassName={styles.editorField}
            onEditorStateChange={this.onEditorStateChange}
          />

          <>
            <div style={{ display: 'flex' }}>
              <Button
                type='primary'
                ghost={true}
                style={{ marginLeft: 'auto', marginBottom: 8 }}
                onClick={this.onTriggerShowRawText}
                htmlType='button'
              >
                {isShowRawText ? 'HIDE ' : 'SHOW '} RAW MARKDOWN
              </Button>
            </div>
            {getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please provide description' }
              ],
              initialValue: ''
            })(
              <div style={styleDescriptionTextArea}>
                <TextArea
                  autosize={{
                    minRows: 2,
                    maxRows: 6
                  }}
                  disabled={true}
                  style={{ cursor: 'default' }}
                  value={getFieldValue('description')}
                />
              </div>
            )}
          </>
        </Form.Item>
        <div>
          <Form.Item
            style={{ flex: 1 }}
            label={<h3 style={{ display: 'inline-block' }}>Attachments</h3>}
          >
            {getFieldDecorator('attachments', {
              rules: []
            })(
              <Dragger {...propsAttachmentsDragger}>
                <p className='ant-upload-drag-icon'>
                  <Icon type='inbox' />
                </p>
                <p className='ant-upload-text'>
                  Click or drag PDF file to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            )}
          </Form.Item>
        </div>

        <div style={{ display: 'flex', marginTop: '18px' }}>
          <Button
            disabled={isPreview}
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

export default withRouter(Form.create<IProps>()(
  graphql<IProps>(CREATE_JOB, { name: 'createJob' })(JobNew)
) as any)
