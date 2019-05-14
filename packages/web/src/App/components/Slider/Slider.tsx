import { Icon, Layout } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'

const { Sider } = Layout

export default class SiderDemo extends React.Component<any, any> {
  public state = {
    collapsed: false
  }

  public onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  public render() {
    const { collapsed } = this.state
    return (
      <Sider {...this.props} collapsible={true} onCollapse={this.onCollapse}>
        <NavLink
          to='/jobs'
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          <Icon type='shopping' />
          {!collapsed && <span>JOBS</span>}
        </NavLink>
        <NavLink
          to='/candidates'
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          <Icon type='idcard' />
          {!collapsed && <span>CANDIDATES POOL</span>}
        </NavLink>
        <NavLink
          to='/companies'
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          <Icon type='idcard' />
          {!collapsed && <span>COMPANIES</span>}
        </NavLink>
        <NavLink
          to='/setting'
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          <Icon type='setting' />
          {!collapsed && <span>SETTING</span>}
        </NavLink>
      </Sider>
    )
  }
}
