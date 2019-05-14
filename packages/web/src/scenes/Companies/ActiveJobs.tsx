import { Avatar, Icon, List } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

const listData: [any?] = []
for (let i = 0; i < 23; i++) {
  listData.push({
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    href: 'http://ant.design',
    title: `Designer example(${i})`
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
    header={
      <>
        <Link
          to='jobs/new'
          className='ant-btn ant-btn-primary ant-btn-background-ghost'
        >
          + NEW JOB
        </Link>
      </>
    }
    className={styles.index}
    split={true}
    itemLayout='vertical'
    size='large'
    pagination={{
      hideOnSinglePage: true
    }}
    dataSource={listData}
    renderItem={(item) => (
      <List.Item className={styles.item} key={item.title}>
        <List.Item.Meta
          avatar={
            <img
              width={140}
              alt='logo'
              src='https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Intel_old_logo.svg/1280px-Intel_old_logo.svg.png'
            />
          }
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}

        <div>
          <IconText key='star' type='star-o' text='156' />{' '}
          <IconText key='like' type='like-o' text='156' />{' '}
          <IconText key='message' type='message' text='2' />
          <Link to={`/job/${1}`}>DETAILS</Link>
        </div>
      </List.Item>
    )}
  />
)
