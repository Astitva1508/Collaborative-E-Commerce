import { Box, Flex, Heading, Text, Button, Image, Grid, GridItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = ({ products }) => {
  // Limit to 3 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <Box p={4}>
      {/* Hero Section */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        bg="primary.500"
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
            <Button variant="outline" color="white" _hover={{ background: "primary.800" }}>
              Shop Now
            </Button>
          </Link>
        </Box>
        <Image
          src="https://www.instorindia.com/wp-content/uploads/2021/09/how-to-start-online-grocery-store.jpg"
          alt="Shopping Image"
          aspectRatio='16/9'
          height='80%'
          objectFit='cover'
          borderRadius="md"
          mt={{ base: 4, md: 0 }}
        />
      </Flex>

      {/* Featured Products */}
      <Heading as="h2" size="lg" mb={4}>
        Featured Products
      </Heading>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6}>
        {featuredProducts.map((product) => (
          <GridItem
            key={product.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            _hover={{ shadow: 'lg' }}
          >
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} aspectRatio='16/9' height='10rem' objectFit='contain'/>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text fontSize="lg" mb={4}>
              $ {product.price}
            </Text>
            <Link to={`/product/${product.id}`}>
              <Button colorScheme="primary" variant="outline">
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
        bg="cyan.600"
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
        <Button colorScheme="primary" variant="solid">
          Sign Up Now
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
