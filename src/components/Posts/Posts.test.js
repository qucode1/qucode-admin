import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

// import posts from '../../blog-posts.json'
import Posts from './Posts'
import PostDetail from '../PostDetail/PostDetail'

const posts = {
  'posts': [{
    'slug': 'post-slug'
  }]
}

const match = {
  'url': '/posts',
  'params': {
    'slug': 'post-slug'
  }
}

test('Should render Post List', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/posts']} initialIndex={0} >
      <Posts posts={posts}/>
    </MemoryRouter>
  )

  expect(component.find('ul').length).toBe(1)
})

it('Posts Component should render as expected', () => {
  const wrapper = shallow(<Posts posts={posts}u/>)
  const tree = toJson(wrapper)
  expect(tree).toMatchSnapshot()
})
