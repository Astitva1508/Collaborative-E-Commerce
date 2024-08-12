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
import {useToast} from '@chakra-ui/react'

function App() {
  const [isCollaborativeMode, setCollaborativeMode] = useState(false);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [inRoomMembers, setInRoomMembers] = useState([]);
  const [sharedCart, setSharedCart] = useState([]);
  const [personalCart, setPersonalCart] = useState([]);
  const products = [
    { id: 1, name: 'Product 1', description: 'This is a great product.', price: 29.99, image: 'https://picsum.photos/400/300?random=1', specifications: 'Color: Red, Size: M, Material: Cotton', reviews: ['Great product!', 'Very comfortable.', 'Will buy again.'] },
    { id: 2, name: 'Product 2', description: 'This product is even better.', price: 39.99, image: 'https://picsum.photos/400/300?random=2', specifications: 'Color: Blue, Size: L, Material: Polyester', reviews: ['Love the color!', 'Fits perfectly.', 'High quality.'] },
    { id: 3, name: 'Product 3', description: 'You will love this product.', price: 49.99, image: 'https://picsum.photos/400/300?random=3', specifications: 'Color: Green, Size: XL, Material: Wool', reviews: ['Warm and cozy.', 'Excellent value.', 'Very stylish.'] },
    { id: 4, name: 'Product 4', description: 'An amazing new product.', price: 25.00, image: 'https://picsum.photos/400/300?random=4', specifications: 'Color: Black, Size: S, Material: Silk', reviews: ['Luxurious feel.', 'Excellent quality.', 'Highly recommend.'] },
    { id: 5, name: 'Product 5', description: 'Top-notch quality product.', price: 75.00, image: 'https://picsum.photos/400/300?random=5', specifications: 'Color: White, Size: L, Material: Linen', reviews: ['Very comfortable.', 'Love the quality.', 'Would buy again.'] },
    { id: 6, name: 'Product 6', description: 'A must-have product.', price: 20.00, image: 'https://picsum.photos/400/300?random=6', specifications: 'Color: Yellow, Size: M, Material: Cotton', reviews: ['Bright and cheerful.', 'Great value.', 'Perfect fit.'] },
  ];

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

  const handlePlaceItemsForAllUsers = () => {
    console.log('Placing items for all users:', sharedCart);
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
        <Route path="/" element={<Home products={products}/>} />
        <Route path="product" element={<ProductPage products={products}/>} />
        <Route
          path="product/:productId"
          element={<ProductDetails addToCommonCart={addToCommonCart} addToPersonalCart={addToPersonalCart} isCollaborativeMode={isCollaborativeMode} inRoomMembers={inRoomMembers} products={products}/>}
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/suggestions" element={<Suggestions 
          inRoomMembers={inRoomMembers}
        />} />
      </Routes>
    </>
  );
}

export default App;
