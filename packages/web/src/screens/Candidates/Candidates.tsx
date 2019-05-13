import { Avatar, Icon, List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

const listData: [any?] = []
for (let i = 0; i < 23; i++) {
    listData.push({
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        description: 'Full stack software engineer',
        href: 'http://ant.design',
        name: `Vitalii Znak (${i})`,

    })
}

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
)

export default () => (
    <List
        header={<><Link to='jobs/new' className='ant-btn ant-btn-primary ant-btn-background-ghost' > + NEW CANDIDATE</Link></>}
        className={styles.index}
        split={true}
        itemLayout='vertical'
        size='large'
        pagination={{
            onChange: (page) => {
                console.log(page)
            },
            pageSize: 3,
        }}
        dataSource={listData}
        renderItem={(item) => (
            <List.Item
                className={styles.item}
                key={item.name}
            // actions={[<IconText key='star' type='star-o' text='156' />, <IconText key='like' type='like-o' text='156' />, <IconText key='message' type='message' text='2' />, <Link style={{marginLeft: 'auto'}} to={`/job/${1}`}>DETAILS</Link>]}
            >
                <List.Item.Meta
                    avatar={<Avatar size={50} icon='user' />}
                    title={<Link to={`/candidates/${1}`} style={{ marginLeft: 'auto' }}>{item.name}</Link>}
                    description={item.description}
                />
                {item.content}
                <div style={{ display: 'flex', marginTop: '10px' }}>
                    <IconText key='star' type='star-o' text='rating 158' />
                    <Link to={`/candidates/${1}`} style={{ marginLeft: 'auto' }}>DETAILS</Link>
                </div>
            </List.Item >
        )}
    />
)
