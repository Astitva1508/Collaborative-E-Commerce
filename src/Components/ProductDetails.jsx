import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Heading, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Checkbox, CheckboxGroup, Stack, } from '@chakra-ui/react';
// Dummy product data (in a real app, you'd fetch this from an API)
const products = [
  { id: 1, name: 'Product 1', description: 'This is a great product.', price: '$29.99', image: 'https://picsum.photos/400/300?random=1' },
  { id: 2, name: 'Product 2', description: 'This product is even better.', price: '$39.99', image: 'https://picsum.photos/400/300?random=2' },
  { id: 3, name: 'Product 3', description: 'You will love this product.', price: '$49.99', image: 'https://picsum.photos/400/300?random=3' },
];

const usersInRoom = ['Alice', 'Bob', 'Charlie']; // Dummy users in the collaborative room

const ProductDetails = ({ addToCommonCart }) => {
  const { productId } = useParams(); // Get the productId from the URL
  const product = products.find(p => p.id === parseInt(productId)); // Find the product by id
  const [selectedUsers, setSelectedUsers] = useState([]);

  const {
    isOpen: isSuggestOpen,
    onOpen: onSuggestOpen,
    onClose: onSuggestClose,
  } = useDisclosure();

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
    // Logic for suggesting to selected users
    console.log('Suggesting to:', selectedUsers);
    onSuggestClose();
  };

  const handleAskForReview = () => {
    // Logic for asking review from selected users
    console.log('Asking for review from:', selectedUsers);
    onReviewClose();
  };

  const handleAddToCommonCart = () => {
    addToCommonCart(product); // Add the product to the common cart
  };

  return (
    <Box p={4}>
      <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
      <Heading as="h2" size="xl" mb={2}>{product.name}</Heading>
      <Text fontSize="lg" mb={4}>{product.description}</Text>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>{product.price}</Text>

      <Button colorScheme="teal" mb={4} onClick={handleAddToCommonCart}>
        Add to Common Cart
      </Button>

      <Button colorScheme="purple" mb={4} onClick={onSuggestOpen}>
        Suggest
      </Button>

      <Button colorScheme="purple" mb={4} onClick={onReviewOpen}>
        Ask for Review
      </Button>

      {/* Suggest Modal */}
      <Modal isOpen={isSuggestOpen} onClose={onSuggestClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Users to Suggest</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup onChange={handleSelectUsers}>
              <Stack>
                {usersInRoom.map(user => (
                  <Checkbox key={user} value={user}>
                    {user}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Button mt={4} colorScheme="teal" onClick={handleSuggest}>
              Suggest
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Ask for Review Modal */}
      <Modal isOpen={isReviewOpen} onClose={onReviewClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Users to Ask for Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup onChange={handleSelectUsers}>
              <Stack>
                {usersInRoom.map(user => (
                  <Checkbox key={user} value={user}>
                    {user}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
            <Button mt={4} colorScheme="teal" onClick={handleAskForReview}>
              Ask for Review
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductDetails;
