import  { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductPage from './Components/ProductPage';
import ProductDetails from './Components/ProductDetails';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CollaborativeRoomPopup from './Components/CollaborativeRoomPopup';
import { extendTheme } from '@chakra-ui/react';
import SharedCart from './Components/SharedCart';
import Suggestions from './Components/Suggestions';

function App() {
  const [isCollaborativeMode, setCollaborativeMode] = useState(false);
  const [sharedCart, setSharedCart] = useState([]);

  const collaborativeTheme = extendTheme({
    colors: {
      brand: {
        900: '#6B46C1',
        800: '#805AD5',
        700: '#9F7AEA',
      },
    },
  });

  const handleEnterCollaborativeMode = () => {
    setCollaborativeMode(true);
  };

  const handleExitCollaborativeMode = () => {
    setCollaborativeMode(false);
  };

  const addToCommonCart = (product) => {
    setSharedCart((prevCart) => [...prevCart, product]);
  };

  return (
    <>
      <Navbar onEnterCollaborativeMode={handleEnterCollaborativeMode} />
      {isCollaborativeMode && (
        <CollaborativeRoomPopup onExit={handleExitCollaborativeMode} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<ProductPage />} />
        <Route
          path="product/:productId"
          element={<ProductDetails addToCommonCart={addToCommonCart} />}
        />
        <Route path="common-cart" element={<SharedCart sharedCart={sharedCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </>
  );
}

export default App;
