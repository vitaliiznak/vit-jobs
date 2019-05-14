import { BackTop } from 'antd'
import React, { Component } from 'react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Applications from './Applications'
import JobDetails from '../JobDetails'
import Notes from './Notes'

import styles from './styles.module.css'

class App extends Component<any, any> {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  public render() {
    return (
      <>
        <JobDetails
          footer={
            <>
              <NavLink
                to={'/jobs/1/applications'}
                className='ant-tabs-tab'
                activeClassName='ant-tabs-tab-active'
              >
                Applications (24)
              </NavLink>
              <NavLink
                to={'/jobs/1/edit'}
                className='ant-tabs-tab'
                activeClassName='ant-tabs-tab-active'
              >
                Edit
              </NavLink>
              {/*         <NavLink
                to={'/jobs/1/notes'}
                className='ant-tabs-tab'
                activeClassName='ant-tabs-tab-active'
              >
                Notes (0)
              </NavLink> */}
            </>
          }
        />
        <Switch>
          <Route
            exact={true}
            path={'/jobs/:id/applications'}
            component={Applications}
          />
          {/*  <Route exact={true} path={'/jobs/:id/notes'} component={Notes} /> */}
          <Route
            exact={true}
            path={'/jobs/:id'}
            render={() => <Redirect to='/jobs/:id/applications' />}
          />
        </Switch>
        <BackTop
          style={{
            right: '20px',
            bottom: '20px'
          }}
          target={() => {
            return window
          }}
          visibilityHeight={1}
        >
          <div className={styles.btnUp}>UP</div>
        </BackTop>
      </>
    )
  }
}

export default App
