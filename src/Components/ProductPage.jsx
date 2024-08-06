import  { useState } from 'react';
import { Box, Input, Grid, GridItem, Heading, Text, Button, Image, Select } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const allProducts = [
    { id: 1, name: 'Product 1', price: 29.99, image: 'https://picsum.photos/300/200?random=1' },
    { id: 2, name: 'Product 2', price: 39.99, image: 'https://picsum.photos/300/200?random=2' },
    { id: 3, name: 'Product 3', price: 49.99, image: 'https://picsum.photos/300/200?random=3' },
    { id: 4, name: 'Product 4', price: 59.99, image: 'https://picsum.photos/300/200?random=4' },
    { id: 5, name: 'Product 5', price: 19.99, image: 'https://picsum.photos/300/200?random=5' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter products based on search term and price filter
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'below30' && product.price < 30) ||
      (priceFilter === '30to50' && product.price >= 30 && product.price <= 50) ||
      (priceFilter === 'above50' && product.price > 50);
    return matchesSearch && matchesPrice;
  });

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Our Products
      </Heading>

      {/* Search Bar */}
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      {/* Filters */}
      <Select
        placeholder="Filter by price"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        mb={6}
      >
        <option value="all">All Prices</option>
        <option value="below30">Below $30</option>
        <option value="30to50">$30 to $50</option>
        <option value="above50">Above $50</option>
      </Select>

      {/* Product Grid */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {filteredProducts.map((product) => (
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
              ${product.price.toFixed(2)}
            </Text>
            <Link to={`/product/${product.id}`}>
              <Button colorScheme="teal" variant="outline">
                View Product
              </Button>
            </Link>
          </GridItem>
        ))}
      </Grid>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
        <Text mt={4} fontSize="lg">
          No products found.
        </Text>
      )}
    </Box>
  );
};

export default ProductPage;
