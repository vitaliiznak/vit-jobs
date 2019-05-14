import { Icon, Tooltip, PageHeader, Modal } from 'antd'
import React from 'react'
import styles from './jobPreview.module.css'

interface IProps {
  style?: any
  className?: string
}
interface Istate {}
class JobPostingPreview extends React.Component<IProps, Istate> {
  public render() {
    const { style, className } = this.props
    return (
      <div style={style} className={`${styles.index} ${className}`}>
        <div className={styles.ribbon}>
          <span>Preview</span>
        </div>
      </div>
    )
  }
}

export default JobPostingPreview
