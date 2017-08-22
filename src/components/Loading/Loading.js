import React from 'react'

import styles from './Loading.css'

const Loading = () => (
  <div className={styles.loader}>
    <div className={styles.inner + ' ' + styles.one} />
    <div className={styles.inner + ' ' + styles.two} />
    <div className={styles.inner + ' ' + styles.three} />
  </div>
)

export default Loading
