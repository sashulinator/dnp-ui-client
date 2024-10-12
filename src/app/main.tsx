import React from 'react'
import ReactDOM from 'react-dom/client'

import { isDev } from '~/utils/core-client'

import App from './app'

const isStrict = localStorage.getItem('devReactStrictMode') === 'true' && isDev()

ReactDOM.createRoot(document.getElementById('root')!).render(
  isStrict ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  ),
)
