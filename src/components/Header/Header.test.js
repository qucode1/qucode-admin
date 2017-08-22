import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import Header from './Header'

describe('<Header />', () => {
  it('should render title and nav as expected', () => {
    const wrapper = shallow(<Header />)
    const tree = toJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
