import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Heading, Text, Button, useDisclosure, useToast, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverCloseButton, Checkbox, CheckboxGroup, Stack, Divider, Flex, List, ListItem, Input, FormControl, FormLabel, } from '@chakra-ui/react';
import { useUser } from '../Context/UserContext';

const ProductDetails = ({ addToCommonCart, addToPersonalCart, isCollaborativeMode, inRoomMembers, products, setfeedBackProducts, setSuggestedProducts }) => {
  const { user, logout } = useUser();
  const { productId } = useParams(); // Get the productId from the URL
  const product = products.find(p => p.id === parseInt(productId)); // Find the product by id
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [quantities, setQuantities] = useState({}); // State for quantities
  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };
  const {
    isOpen: isSuggestOpen,
    onOpen: onSuggestOpen,
    onClose: onSuggestClose,
  } = useDisclosure();

  const toast = useToast();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose,
  } = useDisclosure();

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  const handleSelectUsers = (selected) => {
    setSelectedUsers(selected);
  };

  const handleSuggest = () => {
    const suggestions = JSON.parse(localStorage.getItem('suggestions')) || [];
    const newSuggestion = {
      product,
      suggestedBy: user.id, 
      suggestedTo: selectedUsers
    };
    localStorage.setItem('suggestions', JSON.stringify([...suggestions, newSuggestion]));
    setSuggestedProducts(prev => [...prev, newSuggestion]);
    toast({
      title: 'Product suggested to user',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onSuggestClose();
  };


  const handleAskForReview = () => {
    onReviewClose();
    setfeedBackProducts(prev => [...prev, product]);
    toast({
      title: 'You asked for review on this product.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleAddToCommonCart = () => {
    addToCommonCart(product); // Add the product to the common cart
    toast({
      title: 'Product added to the shared cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };


  const handleAddToPersonalCart = () => {
    addToPersonalCart(product); // Add the product to the personal cart
    toast({
      title: 'Product added to the cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Flex direction={{ base: 'column', md: 'row' }} spacing={4}>
        {/* Product Image */}
        <Box flex="1" mb={{ base: 4, md: 0 }} boxShadow="0 3px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)">
          <Image
            mt={10}
            width='100%'
            src={product.image}
            alt={product.name}
            borderRadius="md"
            cursor="pointer"
            aspectRatio='16/9' objectFit='contain'
            onClick={handleAddToPersonalCart}
          />
        </Box>

        {/* Product Details */}
        <Box flex="2" p={4} border="1px solid #e2e8f0" borderRadius="md" ml={2} boxShadow="0 3px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)">
          <Heading as="h2" size="xl" mb={2}>
            {product.name}
          </Heading>
          <Text fontSize="lg" mb={4}>
            {product.description}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {product.price}
          </Text>
          <Box mb={4}>
            <Text fontWeight="bold">Specifications:</Text>
            <Text>{product.specifications}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold">Reviews:</Text>
            <List spacing={2}>
              {product.reviews.map((review, index) => (
                <ListItem key={index}>{review}</ListItem>
              ))}
            </List>
            <Flex alignItems='center' gap={2} mt={2}>
              <Text><strong>Quantity:</strong></Text>
              <NumberInput
                min={1}
                value={quantities[product.id] || 1} // Use the state value or default to 1
                onChange={(valueString, valueNumber) => handleQuantityChange(product.id, valueNumber)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </Box>
          <Flex direction="flex" spacing={2} gap={5} alignItems='flex-start'>

            <Button colorScheme="blue" mb={2} onClick={handleAddToPersonalCart}>
              Add to Cart
            </Button>
            <Button colorScheme="green">
              Buy Now
            </Button>
          </Flex>
        </Box>
      </Flex>

      {isCollaborativeMode && (
        <>
          <Divider orientation="horizontal" my={4} borderColor="gray.300" />
          {/* Collaborative Actions */}
          <Box p={5} border="1px solid #e2e8f0" borderRadius="md" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.08)">
            <Heading fontSize='2rem' pb={5}>Collaborative Mode</Heading>
            <Flex gap={2}>
              {isCollaborativeMode && <Button colorScheme="primary" mb={2} onClick={handleAddToCommonCart}>
                Add to Common Cart
              </Button>}
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="purple" onClick={onSuggestOpen}>
                    Suggest
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="bold">Suggest to Users</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <CheckboxGroup onChange={handleSelectUsers}>
                      <Stack>
                        {inRoomMembers.map(user => (
                          <Checkbox key={user} value={user}>
                            {user}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                    <Button colorScheme="primary" onClick={handleSuggest} mt={4}>
                      Suggest
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="purple" onClick={onReviewOpen}>
                    Ask for Review
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="bold">Ask for Review</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <CheckboxGroup onChange={handleSelectUsers}>
                      <Stack>
                        {inRoomMembers.map(user => (
                          <Checkbox key={user} value={user}>
                            {user}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                    <Button colorScheme="primary" onClick={handleAskForReview} mt={4}>
                      Ask For Review
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductDetails;
