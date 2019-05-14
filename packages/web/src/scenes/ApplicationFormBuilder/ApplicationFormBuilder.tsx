import React from 'react'
import { Layout } from 'antd'
// tslint:disable-next-line: no-submodule-imports
import ApplicationForm from 'scenes/ApplicationForm'
import ApplicationConfigure from './ApplicationConfigure'
import * as styles from './styles.module.css'

const { Content } = Layout
interface IProps {}
interface Istate {}
class ApplicationPreview extends React.Component<IProps, Istate> {
  public render() {
    return (
      <Layout>
        <Content style={{ display: 'flex', padding: '10px 0' }}>
          <ApplicationConfigure
            style={{ flex: 1, padding: '0px 10px 0px 30px' }}
          />
          <div
            style={{
              width: '0',
              borderLeft: '1px solid #ccc'
            }}
          />
          <div style={{ flex: 2, position: 'relative' }}>
            <div className={styles.ribbon}>
              <span>Preview</span>
            </div>
            <ApplicationForm isPreview={true} style={{ padding: '0 10px' }} />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default ApplicationPreview
