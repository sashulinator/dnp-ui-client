import './main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { isDev } from '~/utils/core-client'

import App from './app'
import Providers from './providers'

const isStrict = localStorage.getItem('devReactStrictMode') === 'true' && isDev()

ReactDOM.createRoot(document.getElementById('root')!).render(
  isStrict ? (
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>
  ) : (
    <Providers>
      <App />
    </Providers>
  ),
)
