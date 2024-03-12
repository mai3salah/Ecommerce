import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TokenContextProvider from './Context/TokenContext';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider} from 'react-query'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import CartContextProvider from './Context/CartContext';
const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <CartContextProvider> 
   <QueryClientProvider client={queryClient}>
    <TokenContextProvider>
    <App/>
   </TokenContextProvider>
   </QueryClientProvider>
   </CartContextProvider>
  </React.StrictMode>
);

reportWebVitals();
