import React from 'react';
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';

const SharedCart = ({ SharedCart }) => {
  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>Common Cart</Heading>
      {SharedCart.length === 0 ? (
        <Text>Your common cart is empty.</Text>
      ) : (
        SharedCart.map(product => (
          <Box key={product.id} p={4} mb={4} borderWidth={1} borderRadius="md">
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
            <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
            <Text fontSize="lg" mb={2}>{product.description}</Text>
            <Text fontSize="xl" fontWeight="bold" mb={4}>{product.price}</Text>
            <Button colorScheme="red">Remove</Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default SharedCart;
