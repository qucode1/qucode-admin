import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Post.css'

const Post = (props) => (
  <div>
    <h2 className={styles.title}>{!props.details ? <Link to={`/posts/${props.slug}`} className={styles.link}>{props.title}</Link> : props.title}</h2>
    <p className={styles.content}>{props.details ? props.content : props.excerpt}</p>
    {props.details && <Link to='/posts' className={styles.link}>Go back to Posts</Link>}
  </div>
)

export default Post
