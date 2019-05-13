import {
    Button, Form, Icon, Input, InputNumber, Layout, message, Select, Upload,
} from 'antd'
import { EditorState } from 'draft-js'
import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import * as styles from './styles.module.css'

const { Content } = Layout
const { Option } = Select
const { Dragger } = Upload

const searchName = (input, option) => (option.props.children as string).startsWith(input.toLowerCase())

const employmentTypes = {
    full_time: {
        title: 'Full Time',
    },
    part_time: {
        title: 'Part Time',
    },
    temporary: {
        title: 'Temporary',
    },
    contract: {
        title: 'Contract',
    },
    internship: {
        title: 'Internship',
    },
    volunteer: {
        title: 'Volunteer',
    },
}

const category = {
    full_time: {
        title: 'Full Time',
    },
    part_time: {
        title: 'Part Time',
    },
    temporary: {
        title: 'Temporary',
    },
    contract: {
        title: 'Contract',
    },
    internship: {
        title: 'Internship',
    },
    volunteer: {
        title: 'Volunteer',
    },
}

const education = {
    full_time: {
        title: 'Full Time',
    },
    part_time: {
        title: 'Part Time',
    },
    temporary: {
        title: 'Temporary',
    },
    contract: {
        title: 'Contract',
    },
    internship: {
        title: 'Internship',
    },
    volunteer: {
        title: 'Volunteer',
    },
}

const propsDragger = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    },
}

const Space = () => <span style={{ width: '8px', display: 'inline-block' }} />
interface IProps {
    form: any
}
interface Istate {
    editorState: Object
}
class JobNew extends React.Component<IProps, Istate> {
    public state = {
        editorState: EditorState.createEmpty(),
    }

    private onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    private onSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
                return
            }
            // fetch

        })
    }

    public render() {
        const { getFieldDecorator } = this.props.form
        const { editorState } = this.state

        return (
            <Layout className={styles.index}>
                <Content className={styles.formWrapper}>
                    <Form onSubmit={this.onSubmit} className='login-form' method='POST' action='/auth/login'>
                        <Form.Item label='Title'>
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input your job title!' }],
                            })(
                                <Input placeholder='Job title' />,
                            )}
                        </Form.Item>
                        <Form.Item required={true} label='Description' >
                            <Editor
                                editorState={editorState}
                                wrapperClassName={styles.editorWrapper}
                                editorClassName={styles.editorField}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </Form.Item>
                        <h3>Job details</h3>
                        <div style={{ display: 'flex' }}>
                            <Form.Item style={{ flex: 1 }} label='Employment type'>
                                {getFieldDecorator('employmentType', {
                                    rules: [{ required: true, message: 'Select employment type' }],
                                })(
                                    <Select
                                        showSearch={true}
                                        placeholder='Select a person'
                                        optionFilterProp='children'
                                        filterOption={searchName}
                                    >
                                        {Object.entries(employmentTypes).map(
                                            ([key, { title }]) => <Option key={key} value='key'>{title}</Option>,
                                        )}
                                    </Select>,
                                )}
                            </Form.Item>
                            <div style={{ width: '10px' }} />
                            <Form.Item style={{ flex: 1 }} label='Category'>
                                {getFieldDecorator('categoty', {
                                    rules: [{ required: true, message: 'Select job category' }],
                                })(
                                    <Select
                                        showSearch={true}
                                        placeholder='Select a person'
                                        optionFilterProp='children'
                                        filterOption={searchName}
                                    >
                                        {Object.entries(category).map(
                                            ([key, { title }]) => <Option key={key} value='key'>{title}</Option>,
                                        )}
                                    </Select>,
                                )}
                            </Form.Item>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Form.Item style={{ flex: 1 }} label='Education'>
                                {getFieldDecorator('edutation', {
                                    rules: [{ required: true, message: 'Select education level' }],
                                })(
                                    <Select
                                        showSearch={true}
                                        placeholder='Select a person'
                                        optionFilterProp='children'
                                        filterOption={searchName}
                                    >
                                        {Object.entries(education).map(
                                            ([key, { title }]) => <Option key={key} value='key'>{title}</Option>,
                                        )}
                                    </Select>,
                                )}
                            </Form.Item>
                            <div style={{ width: '10px' }} />
                            <Form.Item style={{ flex: 1 }} label='Experience'>
                                {getFieldDecorator('experienceYears', {
                                    rules: [{ required: true, message: 'Select experience' }],
                                })(
                                    <InputNumber min={0} max={80} />,
                                )}
                            </Form.Item>
                        </div>
                        <Form.Item style={{ flex: 1 }} label='Hours per week'>

                            {getFieldDecorator('hoursFrom', {
                                rules: [{ required: true, message: 'Select employment type' }],
                            })(
                                <InputNumber min={0} max={40} />,

                            )}
                            <Space /> <span>to</span> <Space />
                            {getFieldDecorator('hoursTo', {
                                rules: [{ required: true, message: 'Select job category' }],
                            })(
                                <InputNumber min={1} max={40} />,
                            )}
                            <Space /><span>hours</span><Space />
                        </Form.Item>
                        <h3>Attachments</h3>
                        <Dragger {...propsDragger}>
                            <p className='ant-upload-drag-icon'>
                                <Icon type='inbox' />
                            </p>
                            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                            <p className='ant-upload-hint'>Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                        </Dragger>
                        <div style={{ display: 'flex', marginTop: '18px' }}>
                            <Button type='primary' htmlType='submit' ghost={true} style={{ marginLeft: 'auto' }}>
                                SAVE
                            </Button>
                        </div>

                    </Form >
                </Content >
            </Layout >
        )
    }

}

export default Form.create()(JobNew as any)
