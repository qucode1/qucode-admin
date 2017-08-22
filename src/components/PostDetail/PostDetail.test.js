import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'

import PostDetail from './PostDetail'

const posts = {
  'posts': [{
    'slug': 'post-slug'
  }]
}

const match = {
  'params': {
    'slug': 'post-slug'
  }
}

const mismatch = {
  'params': {
    'slug': 'different-slug'
  }
}

test('Should render PostDetails when visiting /posts/:slug', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/posts/testing-with-jest-and-enzyme']} initialIndex={0} >
      <PostDetail posts={posts} match={match}/>
    </MemoryRouter>
  )

  expect(component.find(PostDetail).length).toBe(1)
})

it('PostDetail should render as expected', () => {
  const wrapper = shallow(<PostDetail posts={posts} match={match}/>)
  const tree = toJson(wrapper)
  expect(tree).toMatchSnapshot()
})

it('PostDetail should render as expected', () => {
  const wrapper = shallow(<PostDetail posts={posts} match={mismatch}/>)
  const tree = toJson(wrapper)
  expect(tree).toMatchSnapshot()
})
