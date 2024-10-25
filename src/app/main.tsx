import React from 'react'
import ReactDOM from 'react-dom/client'

import { isDev } from '~dnp/utils/core-client'

import Providers from './providers'

const isStrict = localStorage.getItem('devReactStrictMode') === 'true' && isDev()

ReactDOM.createRoot(document.getElementById('root')!).render(
  isStrict ? (
    <React.StrictMode>
      <Providers />
    </React.StrictMode>
  ) : (
    <Providers />
  ),
)
