import { BackTop } from 'antd'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router-dom'
import Candidates from './Candidates'
import JobDetails from './JobDetails'
import Notes from './Notes'

import styles from './styles.module.css'

class App extends Component<any, any> {

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    public render() {
        return (
            <>
                <JobDetails footer={
                    <div>
                        <NavLink to={'/jobs/1/candidates'} className='ant-tabs-tab' activeClassName='ant-tabs-tab-active'>Candidates (24)</NavLink>
                        <NavLink to={'/jobs/1/notes'} className='ant-tabs-tab' activeClassName='ant-tabs-tab-active'>Notes (0)</NavLink>
                    </div>
                } />
                <Switch>
                    <Route
                        exact={true}
                        path={'/jobs/:id/candidates'}
                        component={Candidates}
                    />
                    <Route
                        exact={true}
                        path={'/jobs/:id/notes'}
                        component={Notes}
                    />
                    <Route
                        exact={true}
                        path={'/jobs/:id'}
                        render={() => <Redirect to='/jobs/:id/candidates' />}
                    />

                </Switch>
                <BackTop
                    style={{
                        right: '20px',
                        bottom: '20px',
                    }}
                    target={() => {
                        return document.querySelector('.ant-layout-has-sider > .ant-layout') as HTMLElement || window
                    }}
                    ref={(ref) => {
                        if (ref) {
                            ref.setState({ visible: true })
                        }
                    }}
                    visibilityHeight={100}>
                    <div className={styles.btnUp}>UP</div>
                </BackTop>
            </>
        )
    }
}

export default App
