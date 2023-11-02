import React from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/Navbar'

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // if (msg.color) {
  //   console.log('Receive color = ' + msg.color)
  //   document.body.style.backgroundColor = msg.color
  //   sendResponse('Change color to ' + msg.color)
  // } else {
  //   sendResponse('Color message is none.')
  // }
})

const rootEl = document.createElement('div')
rootEl.id = 'sensasi-navbar-root'
document.body.prepend(rootEl)
const root = createRoot(rootEl)

root.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
)
