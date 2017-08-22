import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import Routes from './Routes'
import About from '../About/About'
import Posts from '../Posts/Posts'
import PostDetail from '../PostDetail/PostDetail'
import NotFound from '../NotFound/NotFound'


test('Should render Welcome Message', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.text()).toContain('Welcome to my Blog!')
})

test('Should render About Component', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/about']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(About).length).toBe(1)
})

test('Should render NotFound when visiting /posts/xyz', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/about/xyz']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )
  expect(component.find(NotFound).length).toBe(1)
})

test('Should render Posts Component', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/posts']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(Posts).length).toBe(1)
})

test('Should render specific PostDetail when visiting /posts/:slug', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/posts/getting-started-with-css-modules-in-webpack']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(PostDetail).length).toBe(1)
})

test('Should render NotFound when visiting /posts/xyz', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/posts/xyz']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(NotFound).length).toBe(1)
})

test('Should render specific NotFound when visiting /xyz', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/xyz']} initialIndex={0} >
      <Routes />
    </MemoryRouter>
  )

  expect(component.find(NotFound).length).toBe(1)
})
