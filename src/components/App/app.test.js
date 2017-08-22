import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import App from './App'

describe('<App />', () => {
  it('App component should render as expected', () => {
    const wrapper = shallow(<App />)
    const tree = toJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
