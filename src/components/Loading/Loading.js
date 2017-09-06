import React from 'react'

import { loadingStyles } from './loadingStyles'

const Loading = () => (
  <div className='loadingContainer'>
    <div className='loader'>
      <div className='inner one' />
      <div className='inner two' />
      <div className='inner three' />
    </div>
    <style jsx>{ loadingStyles }</style>
  </div>
)

export default Loading
