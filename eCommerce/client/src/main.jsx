import ReactDOM from 'react-dom/client'

import App from './App.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'

import { persistor , store } from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer
        autoClose={1000}
        hideProgressBar
        bodyStyle={{
          fontSize: '1.2rem'
        }}
      />
      <App />
    </PersistGate>
  </Provider>
)
