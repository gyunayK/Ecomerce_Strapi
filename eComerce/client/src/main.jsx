import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);
