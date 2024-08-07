import React, { useState } from 'react';
import { Box, Heading, Text, Image, Button, Stack, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Checkbox, CheckboxGroup, useDisclosure } from '@chakra-ui/react';

const usersInRoom = ['Alice', 'Bob', 'Charlie']; // Dummy users for the example

const SharedCart = ({ sharedCart, removeFromCart, onPlaceItemsForAllUsers, onExportToPersonalCart }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSelectUsers = (selected) => {
    setSelectedUsers(selected);
  };

  const handlePlaceItemsForSelectedUsers = () => {
    // Logic for placing items for selected users
    console.log('Placing items for selected users:', selectedUsers);
    onClose(); // Close the modal
  };

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Shared Cart</Heading>
      {sharedCart.length === 0 ? (
        <Text>Your Shared cart is empty.</Text>
      ) : (
        sharedCart.map(product => (
          <Box key={product.id} p={4} mb={4} borderWidth={1} borderRadius="md">
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
            <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
            <Text fontSize="lg" mb={2}>{product.description}</Text>
            <Text fontSize="xl" fontWeight="bold" mb={4}>{product.price}</Text>
            <Button colorScheme="red" onClick={() => removeFromCart(product.id)}>
              Remove
            </Button>
          </Box>
        ))
      )}

      {/* Action Buttons */}
      {sharedCart.length > 0 && (
        <Flex mt={4} gap={4} justify="flex-end">
          <Button colorScheme="blue" onClick={onOpen}>
            Place Order
          </Button>
          <Button colorScheme="teal" onClick={onExportToPersonalCart}>
            Export to Personal Cart
          </Button>
        </Flex>
      )}

      {/* User Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Users to Place Order</ModalHeader>
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
            <Button mt={4} colorScheme="teal" onClick={handlePlaceItemsForSelectedUsers}>
              Place Order
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SharedCart;
