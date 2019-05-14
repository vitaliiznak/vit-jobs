import { ConfigProvider, Icon, List, Empty, Button } from 'antd'
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

const customizeRenderEmpty = () => (
  <Empty description={<span>No jobs available</span>}>
    <Button type='primary'>Create Now</Button>
  </Empty>
)

export default () => (
  <ConfigProvider renderEmpty={customizeRenderEmpty}>
    <List
      header={
        <>
          <Link
            to='jobs/new'
            className='ant-btn ant-btn-primary ant-btn-background-ghost'
          >
            {' '}
            + NEW JOB
          </Link>
        </>
      }
      className={styles.index}
      split={true}
      itemLayout='vertical'
      size='large'
      locale={{
        emptyText: '<h1>No Data</h1>'
      }}
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
            title={
              <Link to={`/jobs/${1}`} style={{ marginLeft: 'auto' }}>
                {item.title}
              </Link>
            }
            description={item.description}
          />
          {item.content}
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <IconText key='star' type='star-o' text='156 aplications' />

            <Link to={`/jobs/${1}`} style={{ marginLeft: 'auto' }}>
              DETAILS
            </Link>
          </div>
        </List.Item>
      )}
    />
  </ConfigProvider>
)
