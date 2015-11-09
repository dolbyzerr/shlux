import React from 'react'
import {render} from 'react-dom'
import App from './'
import store from './store'

const appNode = document.getElementById('app')

store.addListener('change', (props) => {
  console.log(props)
  render(<App {...props} />, appNode)
})

store.set('user', {name: 'Andrei'})
