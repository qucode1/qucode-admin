import React from 'react'
import Post from '../Post/Post'
import NotFound from '../NotFound/NotFound'
import { Route } from 'react-router-dom'

const PostDetail = function (props) {
  const matchingPost = props.posts.posts.find((post) => post.slug === props.match.params.slug)
  return (
    <div>
      {matchingPost
        ? <Post {...matchingPost} details />
        : <Route component={() => <NotFound message='Post not found' />} />}
    </div>
  )
}

export default PostDetail
