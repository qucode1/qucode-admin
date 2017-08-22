import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Post from './Post'

it('should render h2 and p with message as preview', () => {
  const wrapper = shallow(<Post title='preview' slug='preview' content='preview-content' excerpt='preview-excerpt'/>)
  const tree = toJson(wrapper)
  expect(tree).toMatchSnapshot()
})

it('should render h2 and p with message completely and without title link', () => {
  const wrapper = shallow(<Post title='preview' slug='preview' content='preview-content' excerpt='preview-excerpt' details/>)
  const tree = toJson(wrapper)
  expect(tree).toMatchSnapshot()
})
