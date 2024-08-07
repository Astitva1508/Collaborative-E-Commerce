import { Box, Flex, Heading, Text, Button, Image, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample data for featured products
  const featuredProducts = [
    { id: 1, name: 'Product 1', price: '$29.99', image: 'https://picsum.photos/300/200?random=1' },
    { id: 2, name: 'Product 2', price: '$39.99', image: 'https://picsum.photos/300/200?random=2' },
    { id: 3, name: 'Product 3', price: '$49.99', image: 'https://picsum.photos/300/200?random=3' },
  ];

  return (
    <Box p={4}>
      {/* Hero Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        bg="teal.500"
        p={6}
        borderRadius="md"
        color="white"
        mb={6}
      >
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            Welcome to My E-Commerce!
          </Heading>
          <Text fontSize="lg" mb={4}>
            Discover our amazing products and great deals.
          </Text>
          <Link to="/product">
            <Button variant="outline" color="white" _hover={{ background: "teal.800" }}>
              Shop Now
            </Button>
          </Link>
        </Box>
        <Image
          src="https://picsum.photos/400/300?random=4"
          alt="Shopping Image"
          borderRadius="md"
          mt={{ base: 4, md: 0 }}
        />
      </Flex>

      {/* Featured Products */}
      {/* Featured Products */}
      <Heading as="h2" size="lg" mb={4}>
        Featured Products
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {featuredProducts.map((product) => (
          <GridItem
            key={product.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            _hover={{ shadow: 'lg' }}
          >
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text fontSize="lg" mb={4}>
              {product.price}
            </Text>
            <Link to={`/product/${product.id}`}>
              <Button colorScheme="teal" variant="outline">
                View Product
              </Button>
            </Link>
          </GridItem>
        ))}
      </Grid>

      {/* Call-to-Action Banner */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        bg="gray.700"
        p={8}
        borderRadius="md"
        color="white"
        mt={10}
      >
        <Heading as="h2" size="lg" mb={4}>
          Sign Up for Exclusive Offers!
        </Heading>
        <Text fontSize="lg" mb={4}>
          Join our newsletter and be the first to know about new products and special deals.
        </Text>
        <Button colorScheme="teal" variant="solid">
          Sign Up Now
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
