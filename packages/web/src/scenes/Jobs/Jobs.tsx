import { ConfigProvider, Icon, List, Empty, Input } from 'antd'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'

import { GET_JOBS } from 'queries'
import styles from './styles.module.css'

const { Search } = Input

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
const customizeRenderEmpty = () => (
  <Empty description={<span>No jobs available</span>}>
    <Link
      className='ant-btn ant-btn-primary ant-btn-background-ghost'
      to='/jobs/new'
    >
      Create Now
    </Link>
  </Empty>
)

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)
const Jobs = ({ jobsQuery }): any => {
  if (jobsQuery.error) {
    return <div>Some error occured </div>
  }
  const dataSource: [any] = jobsQuery.jobs
  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <div />
      <List
        loading={jobsQuery.loading}
        header={
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}
            >
              <div>
                <NavLink
                  exact={true}
                  to={'/jobs'}
                  className='ant-tabs-tab'
                  activeClassName='ant-tabs-tab-active'
                >
                  ALL
                </NavLink>
                <NavLink
                  exact={true}
                  to={'/jobs/publish'}
                  className='ant-tabs-tab'
                  activeClassName='ant-tabs-tab-active'
                >
                  PUBLISHED & TO PUBLISH
                </NavLink>
                <NavLink
                  exact={true}
                  to={'/jobs/drafts'}
                  className='ant-tabs-tab'
                  activeClassName='ant-tabs-tab-active'
                >
                  DRAFTS
                </NavLink>
              </div>
              <Link
                to='jobs/new'
                className='ant-btn ant-btn-primary ant-btn-background-ghost'
              >
                {' '}
                + NEW JOB
              </Link>
            </div>
            <Search
              placeholder='input search text'
              onSearch={(value) => console.log(value)}
            />
          </>
        }
        className={styles.index}
        split={true}
        itemLayout='vertical'
        size='large'
        pagination={{
          hideOnSinglePage: true
        }}
        dataSource={dataSource}
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
              <div style={{ marginLeft: 'auto' }}>
                <Link to={`/jobs/${1}`}>PREVIEW</Link>
                <div style={{ display: 'inline-block', width: '10px' }} />
                <Link to={`/jobs/${1}`}>DETAILS</Link>
              </div>
            </div>
          </List.Item>
        )}
      />
    </ConfigProvider>
  )
}

export default graphql(GET_JOBS, { name: 'jobsQuery' })(Jobs as any)
