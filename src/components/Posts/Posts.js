import React from 'react'
import { Link } from 'react-router-dom'

import Post from '../Post/Post'
import styles from '../Post/Post.css'

const Posts = (props) => (
  <div className='main'>
    {props.posts.posts.map((post) => (
      <Post key={post.slug} {...post} details={false} />
    ))}
    <ul>
      <li>
        <Link to='/posts/test'><h2 className={styles.title}>Using TravisCI (will not work)</h2></Link>
      </li>
      <li>
        <Link to='/test'>Go Somewhere (Won't work)</Link>
      </li>
      <li>
        <Link to='/about/cyxc/7sy'>Go Somewhere (Won't work)</Link>
      </li>
    </ul>
    <style jsx>{`
    `}</style>
  </div>
)

export default Posts
