import React, { Component } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'

import Bundle from '../Bundle/Bundle'
import About from 'bundle-loader?lazy&name=bundle-[name]!../About/About'
import Posts from 'bundle-loader?lazy&name=bundle-[name]!../Posts/Posts'
import Rows from 'bundle-loader?lazy&name=bundle-[name]!../Rows/Rows'
import PostDetail from 'bundle-loader?lazy&name=bundle-[name]!../PostDetail/PostDetail'
import RowHandler from 'bundle-loader?lazy&name=bundle-[name]!../RowHandler/RowHandler'
import NotFound from 'bundle-loader?lazy&name=bundle-[name]!../NotFound/NotFound'
import posts from '../../blog-posts.json'

const LazyAbout = (props) => (
  <Bundle load={About}>
    {LazyAbout => <LazyAbout {...props} />}
  </Bundle>
)

const LazyPosts = (props) => (
  <Bundle load={Posts}>
    {LazyPosts => <LazyPosts {...props} />}
  </Bundle>
)

const LazyRows = (props) => (
  <Bundle load={Rows}>
    {LazyRows => <LazyRows {...props} />}
  </Bundle>
)

const LazyPostDetail = (props) => (
  <Bundle load={PostDetail}>
    {LazyPostDetail => <LazyPostDetail {...props} />}
  </Bundle>
)

const LazyRowHandler = (props) => (
  <Bundle load={RowHandler}>
    {LazyRowHandler => <LazyRowHandler {...props} />}
  </Bundle>
)

const LazyNotFound = (props) => (
  <Bundle load={NotFound}>
    {LazyNotFound => <LazyNotFound {...props} />}
  </Bundle>
)

class Routes extends Component {
  componentDidMount () {
    About(() => {})
    Posts(() => {})
    Rows(() => {})
    PostDetail(() => {})
    RowHandler(() => {})
    NotFound(() => {})
  }

  render () {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          <h2>Welcome to my Blog! My Web App SW should update automatically...!</h2>
        )} />
        <Route path='/posts/:slug' component={(props) => <LazyPostDetail posts={posts} match={props.match} />} />
        <Route path='/posts' component={() => <LazyPosts posts={posts} />} />
        <Route path='/rows/:id' component={LazyRowHandler} />
        <Route path='/rows' component={() => <LazyRows />} />
        <Route exact path='/about' component={LazyAbout} />
        <Route component={() => <LazyNotFound message='Url does not exist' />} />
        <style jsx>{`
        `}</style>
      </Switch>
    )
  }
}

export default Routes
