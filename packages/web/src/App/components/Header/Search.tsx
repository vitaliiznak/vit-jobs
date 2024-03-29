import { AutoComplete, Icon, Input } from 'antd'
import React from 'react'

const Option = AutoComplete.Option
const OptGroup = AutoComplete.OptGroup

const dataSource = [{
    title: '话题',
    children: [{
        title: 'AntDesign',
        count: 10000,
    }, {
        title: 'AntDesign UI',
        count: 10600,
    }],
}, {
    title: '问题',
    children: [{
        title: 'AntDesign UI 有多好',
        count: 60100,
    }, {
        title: 'AntDesign 是啥',
        count: 30010,
    }],
}, {
    title: '文章',
    children: [{
        title: 'AntDesign 是一个设计语言',
        count: 100000,
    }],
}]

function renderTitle(title) {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href='https://www.google.com/search?q=antd'
                target='_blank'
                rel='noopener noreferrer'
            >更多
        </a>
        </span>
    )
}

const options = dataSource.map((group) => (
    <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
    >
        {group.children.map((opt) => (
            <Option key={opt.title} value={opt.title}>
                {opt.title}
                <span>{opt.count} 人 关注</span>
            </Option>
        ))}
    </OptGroup>
)).concat([
    (
        <Option disabled={true} key='all' >
            <a
                href='https://www.google.com/search?q=antd'
                target='_blank'
                rel='noopener noreferrer'
            >
                查看所有结果
            </a>
        </Option>
    ),
])

export default () => {
    return (
        <div style={{ width: 250 }}>
            <AutoComplete
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size='large'
                style={{ width: '100%' }}
                dataSource={options}
                placeholder='input here'
                optionLabelProp='value'
            >
                <Input suffix={<Icon type='search' />} />
            </AutoComplete>
        </div >
    )
}
