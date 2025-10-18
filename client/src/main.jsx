import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ Import Bootstrap CSS & JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App.jsx';

// ✅ Import Redux Provider and Store
import { Provider } from 'react-redux';
import { store } from './store/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
