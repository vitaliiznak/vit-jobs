import { Layout } from 'antd'
import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import Candidates from '../screens/Candidates'
import JobItem from '../screens/JobItem'
import JobNew from '../screens/JobNew'
import Jobs from '../screens/Jobs'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import HeaderApp from './components/Header'
import SliderApp from './components/Slider'

const {
    Content,
} = Layout

const WithHeaderLayou = ({ children }) => (
    <Layout>
        <HeaderApp />
        <Layout>
            <SliderApp />
            <Layout>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    </Layout >
)
const JobsLayout = () => (<WithHeaderLayou> <Jobs /> </WithHeaderLayou>)
const CandidatesLayout = () => (<WithHeaderLayou> <Candidates /> </WithHeaderLayou>)
const JobNewLayout = () => (<WithHeaderLayou> <JobNew /> </WithHeaderLayou>)
const JobItemLayout = () => (<WithHeaderLayou> <JobItem /> </WithHeaderLayou>)

class RouterMain extends Component {
    public render() {
        return (
            <Router basename={process.env.REACT_APP_BASE_URL}>
                <Switch>
                    <Route exact={true} path={'/signup'} component={Signup} />
                    <Route exact={true} path={'/login'} component={Login} />

                    <Route
                        exact={true}
                        path={'/jobs/new'}
                        component={JobNewLayout}
                    />
                    <Route
                        path={'/jobs/:id'}
                        component={JobItemLayout}
                    />
                    <Route
                        exact={true}
                        path={'/jobs'}
                        component={JobsLayout}
                    />
                    <Route
                        exact={true}
                        path={'/candidates/:id'}
                        component={CandidatesLayout}
                    />
                    <Route
                        exact={true}
                        path={'/candidates'}
                        component={CandidatesLayout}
                    />
                    <Route
                        exact={true}
                        path={'/'}
                        render={() => <Redirect to='/jobs' />}
                    />
                </Switch>
            </Router>
        )
    }
}

export default RouterMain
