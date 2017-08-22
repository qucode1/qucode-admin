import React from 'react'
import { render } from 'react-dom'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import './base.css'
import App from './components/App/App'

render(<App />, document.getElementById('app'))

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating')
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady')
      OfflinePluginRuntime.applyUpdate()
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated')
      window.location.reload()
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed')
    }
  })
}
