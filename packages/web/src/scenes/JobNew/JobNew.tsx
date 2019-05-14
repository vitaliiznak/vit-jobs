import { Icon, Tooltip, PageHeader, Modal, Layout } from 'antd'
import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router'

import ApplicationFormBuilder from '../ApplicationFormBuilder'
import Promote from '../Promote'
import JobForm from './JobForm'
import JobPreview from './JobPreview'
import styles from './styles.module.css'

const { Content } = Layout

const JobPostingLayout = () => (
  <Layout className={styles.index}>
    <Content className={styles.formWrapper}>
      <div style={{ display: 'flex' }}>
        <JobForm style={{ flex: 1, padding: '0 8px' }} />
        <div
          style={{
            width: 0,
            borderLeft: '1px solid #cacaca',
            padding: '0 4px'
          }}
        />
        <JobPreview style={{ flex: 1, padding: '0 8px' }} />
      </div>
    </Content>
  </Layout>
)

const TooltipWrapper = ({ children, withTooltip }) =>
  withTooltip ? (
    <Tooltip
      placement='topLeft'
      title='You should crate job posting first'
      className={styles.tooltipNext}
    >
      {children}
    </Tooltip>
  ) : (
    children
  )

interface IProps {
  match: any
}
interface Istate {}
class JobNew extends React.Component<IProps, Istate> {
  private onApplications = (ev) => {
    const {
      match: {
        params: { id }
      }
    } = this.props
    if (!Boolean(id)) {
      ev.preventDefault()
      Modal.info({
        title: 'You should crate job posting first',
        content: null
      })
    }
  }
  private onPromote = this.onApplications

  public render() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    const isJobCreated = Boolean(id)
    return (
      <>
        <PageHeader
          title='Create a job vacancy'
          footer={
            <>
              <NavLink
                to={isJobCreated ? `/jobs/${id}/new` : '/jobs/new'}
                className='ant-tabs-tab'
                activeClassName='ant-tabs-tab-active'
              >
                Job posting
              </NavLink>
              <Icon type='arrow-right' />
              <TooltipWrapper withTooltip={!isJobCreated}>
                <NavLink
                  to={'/jobs/1/applications/new'}
                  className='ant-tabs-tab'
                  activeClassName='ant-tabs-tab-active'
                  onClick={this.onApplications}
                >
                  Application Form Builder
                </NavLink>
              </TooltipWrapper>

              <Icon type='arrow-right' />
              <TooltipWrapper withTooltip={!isJobCreated}>
                <NavLink
                  to={'/jobs/1/promote/new'}
                  className='ant-tabs-tab'
                  activeClassName='ant-tabs-tab-active'
                  onClick={this.onPromote}
                >
                  Promote request
                </NavLink>
              </TooltipWrapper>
            </>
          }
        />
        <Switch>
          <Route exact={true} path='/jobs/new' component={JobPostingLayout} />
          <Route
            exact={true}
            path='/jobs/:id/new'
            component={JobPostingLayout}
          />
          <Route
            exact={true}
            path='/jobs/:id/applications/new'
            component={ApplicationFormBuilder}
          />
          <Route
            exact={true}
            path='/jobs/:id/promote/new'
            component={Promote}
          />
        </Switch>
      </>
    )
  }
}

export default withRouter(JobNew)
