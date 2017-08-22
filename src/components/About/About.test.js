import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import About from './About'

describe('<About />', () => {
  it('should render title and paragraph as expected', () => {
    const wrapper = shallow(<About />)
    const tree = toJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
