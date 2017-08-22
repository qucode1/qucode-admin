import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import NotFound from './NotFound'

describe('<NotFound />', () => {
  it('should render h2 and p with message as expected', () => {
    const wrapper = shallow(<NotFound message='test message' />)
    const tree = toJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
