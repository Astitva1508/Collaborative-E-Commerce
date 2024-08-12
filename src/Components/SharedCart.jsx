import React, { useState } from 'react';
import { Box, Text, Image, Heading, Button, NumberInputStepper, Flex, NumberInput, NumberInputField, List, ListItem, NumberIncrementStepper, NumberDecrementStepper, Checkbox, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useUser } from '../Context/UserContext';
import { Link } from 'react-router-dom';

const SharedCart = ({ sharedCart, removeFromCart, inRoomMembers, onExportToPersonalCart }) => {
  const { user } = useUser(); // Get user from context
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [quantities, setQuantities] = useState({}); // State for quantities

  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };

  const handleExportToPersonalCart = () => {
    const itemsToExport = sharedCart.filter(product => selectedItems.includes(product.id));
    onExportToPersonalCart(itemsToExport); // Pass selected items to the export function
  };

  const { isOpen: isOrderOpen, onOpen: onOrderOpen, onClose: onOrderClose } = useDisclosure();

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter(id => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handlePlaceOrder = () => {
    // Implement place order logic here
    onOrderClose();
  };

  return (
    <>
        <Heading textAlign='center' mt={4}>Shared Cart</Heading>
      {sharedCart.length === 0 ?
        <Flex direction='column' alignItems='center' mt={4}>
          <Text margin='5'>No Products found in the shared cart</Text>
          <Link to="/product">
            <Button variant="outline" colorScheme='primary' _hover={{ background: "primary.100" }}>
              Shop Now
            </Button>
          </Link>
        </Flex>
        :
        <Box p={4}>
          <Box mb={4}>
            <List spacing={3}>
              {sharedCart.map(item => (
                <ListItem key={item.id} border="1px solid #e2e8f0" borderRadius="md" p={4} mb={4}>
                  <Flex align="center">
                    <Checkbox
                      isChecked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      mr={4}
                    />
                    <Image
                      src={item.image}
                      alt={item.name}
                      borderRadius="md"
                      boxSize="100px"
                      objectFit="cover"
                      mr={4}
                    />
                    <Box>
                      <Text fontWeight="bold" mb={2}>{item.name}</Text>
                      <Text><strong>Price:</strong> {item.price}</Text>
                      <Text><strong>Description:</strong> {item.description}</Text>
                      <Text><strong>Specifications:</strong> {item.specifications}</Text>
                      <Flex alignItems='center' gap={2} mt={2}>
                        <Text><strong>Quantity:</strong></Text>
                        <NumberInput
                          min={1}
                          value={quantities[item.id] || 1} // Use the state value or default to 1
                          onChange={(valueString, valueNumber) => handleQuantityChange(item.id, valueNumber)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                      <Text fontSize="md" fontStyle='italic' color="blue.500" mt={2}>Added by: {user.id}</Text>

                      <Button colorScheme="red" size="sm" mt={2} onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </Box>
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Action Buttons */}
          {sharedCart.length > 0 && (
            <Flex mt={4} gap={4} justify="flex-end">
              <Button colorScheme="blue" onClick={onOrderOpen}>
                Place Order
              </Button>
              <Button colorScheme="teal" onClick={handleExportToPersonalCart}>
                Export to Personal Cart
              </Button>
            </Flex>
          )}

          {/* Place Order Dialog */}
          <AlertDialog
            isOpen={isOrderOpen}
            onClose={onOrderClose}
            leastDestructiveRef={undefined}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Place Order
                </AlertDialogHeader>

                <AlertDialogBody>
                  <FormControl mb={4}>
                    <FormLabel>Order Note</FormLabel>
                    <Input
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Add a note for your order..."
                    />
                  </FormControl>
                  <Box mb={4}>
                    <List spacing={3}>
                      {sharedCart
                        .filter(item => selectedItems.includes(item.id))
                        .map(item => (
                          <ListItem key={item.id} border="1px solid #e2e8f0" borderRadius="md" p={4}>
                            <Text fontWeight="bold" mb={2}>{item.name}</Text>
                            <Text><strong>Price:</strong> {item.price}</Text>
                            <Text><strong>Description:</strong> {item.description}</Text>
                            <Text><strong>Specifications:</strong> {item.specifications}</Text>
                            <Text fontSize="md" fontStyle='italic' color="blue.500">Added by: {user.id}</Text>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button colorScheme="blue" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                  <Button onClick={onOrderClose}>Cancel</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      }
    </>
  );
};

export default SharedCart;
