import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './Context/UserContext';
import { ThemeProvider } from './Context/ThemeContext';
import { extendTheme } from '@chakra-ui/react';
const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#e0f7ff',
      100: '#b3eaff',
      200: '#80dbff',
      300: '#4dcdff',
      400: '#1abfff',
      500: '#00a6e6',  // Primary cyan color
      600: '#0084b4',
      700: '#006382',
      800: '#004250',
      900: '#002120',
    },
  },
});



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <ChakraProvider theme={customTheme}>
            <App />
          </ChakraProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
