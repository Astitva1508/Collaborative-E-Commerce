import React, { useState } from 'react';
import { Box, Button, Heading,List, ListItem, NumberInput,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper, Checkbox, Divider, NumberInputField, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, FormControl, FormLabel, Input, Text, Image, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PersonalCart = ({ personalCart, removeFromPersonalCart, placeOrder }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderNote, setOrderNote] = useState('');
  const [quantities, setQuantities] = useState({}); // State for quantities
  const handleQuantityChange = (productId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };
  const {
    isOpen: isOrderOpen,
    onOpen: onOrderOpen,
    onClose: onOrderClose,
  } = useDisclosure();

  const handleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter(id => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const handlePlaceOrder = () => {
    placeOrder(selectedItems, orderNote);
    onOrderClose();
  };

  return (
    <>
      <Heading textAlign='center' mt={4}>My Cart</Heading>
    {personalCart.length == 0 ?
      <Flex direction='column' alignItems='center' mt={4}>
        <Text margin='5' >No Products found in the personal cart</Text>
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
          {personalCart.map(item => (
            <ListItem key={item.id} border="1px solid #e2e8f0" borderRadius="md" p={4} mb={4}>
              <Flex align="center">
                <Checkbox
                  isChecked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  mr={4}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    borderRadius="md"
                    boxSize="100px"
                    objectFit="cover"
                    mr={4}
                  />
                </Checkbox>
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
                  <Button colorScheme="red" size="sm" mt={2} onClick={() => removeFromPersonalCart(item.id)}>
                    Remove
                  </Button>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button colorScheme="blue" onClick={onOrderOpen}>
        Place Order
      </Button>

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
                  {personalCart
                    .filter(item => selectedItems.includes(item.id))
                    .map(item => (
                      <ListItem key={item.id} border="1px solid #e2e8f0" borderRadius="md" p={4}>
                        <Text fontWeight="bold" mb={2}>{item.name}</Text>
                        <Text><strong>Price:</strong> {item.price}</Text>
                        <Text><strong>Description:</strong> {item.description}</Text>
                        <Text><strong>Specifications:</strong> {item.specifications}</Text>
                      </ListItem>
                    ))}
                </List>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={handlePlaceOrder} float='right'>
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

export default PersonalCart;
