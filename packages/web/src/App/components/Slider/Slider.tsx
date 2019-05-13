import { Icon, Layout } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

const {
    Sider,
} = Layout

export default class SiderDemo extends React.Component {
    public state = {
        collapsed: false,
    }

    public onCollapse = (collapsed) => {
        this.setState({ collapsed })
    }

    public render() {
        const { collapsed } = this.state
        return (<Sider
            width={118}
            collapsible={true}
            onCollapse={this.onCollapse}

        >
            <NavLink to='/jobs' className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Icon type='shopping' />
                {!collapsed && <span className='nav-text'>JOBS</span>}
            </NavLink>
            <NavLink to='/candidates' className={styles.navLink} activeClassName={styles.navLinkActive}>
                <Icon type='idcard' />
                {!collapsed && <span className='nav-text'>CANDIDATES POOL</span>}
            </NavLink>
        </Sider>
        )
    }
}
