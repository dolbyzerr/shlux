# Shlux
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

store.addListener('change', (props) => {
    ReactDOM.render(<App {...props} />, document.getElementById('app'))
})
```
