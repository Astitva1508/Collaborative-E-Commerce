import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ProductPage from './Components/ProductPage';
import ProductDetails from './Components/ProductDetails';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CollaborativeRoomPopup from './Components/CollaborativeRoomPopup';
import SharedCart from './Components/SharedCart';
import PersonalCart from './Components/PersonalCart';
import Suggestions from './Components/Suggestions';
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react';
import products from './assets/product';

function App() {
  const [isCollaborativeMode, setCollaborativeMode] = useState(false);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [inRoomMembers, setInRoomMembers] = useState([]);
  const [sharedCart, setSharedCart] = useState([]);
  const [personalCart, setPersonalCart] = useState([]);
  const [feedbackProducts, setfeedBackProducts] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const addToCommonCart = (product) => {
    setSharedCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setSharedCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const addToPersonalCart = (product) => {
    setPersonalCart((prevCart) => [...prevCart, product]);
  };

  const removeFromPersonalCart = (productId) => {
    setPersonalCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };
  const toast = useToast();

  const handleExportToPersonalCart = () => {
    setPersonalCart((prevCart) => [...prevCart, ...sharedCart]);
    toast({
      title: 'Products added to the personal cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handlePlaceOrder = (selectedItems, orderNote) => {
    // Implement the logic for placing the order
    console.log('Placing order for items:', selectedItems, 'with note:', orderNote);
    setPersonalCart((prevCart) => prevCart.filter(item => !selectedItems.includes(item.id)));
  };

  return (
    <>
      <Navbar
        setCollaborativeMode={setCollaborativeMode}
        setCurrentMembers={setCurrentMembers}
        currentMembers={currentMembers}
        setInRoomMembers={setInRoomMembers}
        isCollaborativeMode={isCollaborativeMode}
      />
      {isCollaborativeMode && (
        <CollaborativeRoomPopup
          setCollaborativeMode={setCollaborativeMode}
          inRoomMembers={inRoomMembers}
          setInRoomMembers={setInRoomMembers}
        />
      )}
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="product" element={<ProductPage products={products} />} />
        <Route
          path="product/:productId"
          element={
            <ProductDetails
              addToCommonCart={addToCommonCart}
              addToPersonalCart={addToPersonalCart}
              isCollaborativeMode={isCollaborativeMode}
              inRoomMembers={inRoomMembers}
              products={products}
              setfeedBackProducts={setfeedBackProducts}
              setSuggestedProducts={setSuggestedProducts}
            />
          }

        />
        <Route
          path="common-cart"
          element={
            <SharedCart
              sharedCart={sharedCart}
              removeFromCart={removeFromCart}
              inRoomMembers={inRoomMembers}
              onExportToPersonalCart={handleExportToPersonalCart}
            />
          }
        />
        <Route
          path="personal-cart"
          element={
            <PersonalCart
              personalCart={personalCart}
              removeFromPersonalCart={removeFromPersonalCart}
              placeOrder={handlePlaceOrder}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/suggestions" element={
          <Suggestions
            feedbackProducts={feedbackProducts}
            suggestedProducts={suggestedProducts}
          />} />
      </Routes>
    </>
  );
}

export default App;
