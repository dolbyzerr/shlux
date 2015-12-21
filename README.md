# Shlux [![Build Status](https://travis-ci.org/dolbyzerr/shlux.svg?branch=v0.1)](https://travis-ci.org/dolbyzerr/shlux)
Like Flux but simpler

Uses [Immutable.js](https://facebook.github.io/immutable-js/) to store the state of the whole app, and when something changed in the store just triggers `change` event

## Installation
```bash
npm install immutable shlux
```

## Example
```javascript
import ReactDOM from 'react-dom'
import Store from 'shlux'

const store = new Store()

store.on('change', (props) => {
    ReactDOM.render(<App {...props} />, document.getElementById('app'))
})
```
