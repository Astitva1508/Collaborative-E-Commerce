import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Divider,
  Image,
  HStack,
  Input,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react';

// Assuming you have a UserContext
import { useUser } from './../Context/UserContext';
import { Link } from 'react-router-dom';

const suggestedBy = ['Alice', 'Bob', 'Charlie'];
const suggestedTo = ['Dave', 'Eve', 'Frank'];

function Suggestions({ feedbackProducts, suggestedProducts }) {
  console.log(suggestedProducts);
  const [viewSuggestions, setViewSuggestions] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});
  const [feedbackInputs, setFeedbackInputs] = useState({});

  // Use context to get the current user's username
  const { user } = useUser();

  useEffect(() => {
    // Load feedbacks from localStorage when the component mounts
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
    setFeedbacks(storedFeedbacks);
  }, []);

  const handleAddFeedback = (productId) => {
    if (feedbackInputs[productId]?.trim() === '' || !user) return;

    const newFeedback = { user: String(user.id), comment: String(feedbackInputs[productId]) };
    const updatedFeedbacks = {
      ...feedbacks,
      [productId]: [...(feedbacks[productId] || []), newFeedback],
    };

    setFeedbacks(updatedFeedbacks);
    setFeedbackInputs({ ...feedbackInputs, [productId]: '' });

    // Save feedbacks to localStorage
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
  };

  const handleFeedbackInputChange = (productId, value) => {
    setFeedbackInputs({ ...feedbackInputs, [productId]: value });
  };

  return (
    <Box p={4}>
      {/* Toggle Section */}
      <HStack spacing={4} align="center" mb={2}>
        <Text
          cursor="pointer"
          fontWeight={!viewSuggestions ? 'bold' : 'normal'}
          onClick={() => setViewSuggestions(false)}
        >
          Feedbacks
        </Text>
        <Divider orientation="vertical" height="20px" borderColor="gray.300" />
        <Text
          cursor="pointer"
          fontWeight={viewSuggestions ? 'bold' : 'normal'}
          onClick={() => setViewSuggestions(true)}
        >
          Suggestions
        </Text>
      </HStack>

      <Divider borderColor="gray.300" mb={4} />

      {viewSuggestions ? (
        // Render suggestions view (not affected by feedback changes)
        suggestedProducts.map((product, key) => (
          <Flex key={key}>
            <Box flex="1" p={4} border="1px solid #e2e8f0" borderRadius="md">
              <Flex gap={5}>
                <Image src={product.product.image} alt={product.product.name} borderRadius="md" mb={4} aspectRatio='16/9' height='15rem' objectFit='contain' />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {product.product.name}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    {product.product.description}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    {product.product.specifications}
                  </Text>
                  <Text fontWeight='bold'>Reviews :</Text>
                  <List spacing={2}>
                    {product.product.reviews.map((review, index) => (
                      <ListItem key={index}>{review}</ListItem>
                    ))}
                  </List>
                  <Text fontSize="lg" fontWeight="bold" color="teal.500" mt={4}>
                    ${product.product.price}
                  </Text>
                </Box>
              </Flex>
              <Link to={`/product/${product.id}`}>
                <Button colorScheme="primary" variant="outline" float='right'>
                  View Product
                </Button>
              </Link>
            </Box>

            <Box flex="1" p={4} ml={4} border="1px solid #e2e8f0" borderRadius="md">
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
                <Text ><span style={{ fontWeight: 'bold' }}>Suggested By:</span> {product.suggestedBy}</Text>

                <Text fontWeight="bold" mt={4}>Suggested To:</Text>
                <List spacing={2} mt={4}>
                  {product.suggestedTo.map((sug, index) => (
                    <ListItem key={index} p={2} border="1px solid #e2e8f0" borderRadius="md">
                      {index + 1}. {sug}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>

          </Flex>
        ))) : (
        feedbackProducts.map((product, key) => (
          <Flex key={key}>
            <Box flex="1" p={4} border="1px solid #e2e8f0" borderRadius="md">
              <Flex gap={5}>
                <Image src={product.image} alt={product.name} borderRadius="md" mb={4} aspectRatio='16/9' height='15rem' objectFit='contain' />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    {product.description}
                  </Text>
                  <Text fontSize="md" color="gray.600" mb={2}>
                    {product.specifications}
                  </Text>
                  <Text fontWeight='bold'>Reviews :</Text>
                  <List spacing={2}>
                    {product.reviews.map((review, index) => (
                      <ListItem key={index}>{review}</ListItem>
                    ))}
                  </List>
                  <Text fontSize="lg" fontWeight="bold" color="teal.500" mt={4}>
                    ${product.price}
                  </Text>
                </Box>
              </Flex>
              <Link to={`/product/${product.id}`}>
                <Button colorScheme="primary" variant="outline" float='right'>
                  View Product
                </Button>
              </Link>
            </Box>

            <Box flex="1" p={4} ml={4} border="1px solid #e2e8f0" borderRadius="md">
              <Text fontSize="lg" fontWeight="bold" mb={2} color='gray.600'>
                Feedbacks
              </Text>
              {feedbacks[product.id]?.length === 0 ? (
                <VStack align="start" spacing={2}>
                  <Text>No feedbacks available.</Text>
                  <HStack spacing={4} mt={4}>
                    <Input
                      placeholder="Enter your feedback"
                      value={feedbackInputs[product.id] || ''}
                      onChange={(e) => handleFeedbackInputChange(product.id, e.target.value)}
                    />
                    <Button colorScheme="teal" onClick={() => handleAddFeedback(product.id)}>
                      Add
                    </Button>
                  </HStack>
                </VStack>
              ) : (
                <VStack align="start" spacing={2}>
                  {feedbacks[product.id]?.map((feedback, index) => (
                    <Box key={index} borderWidth="1px" borderRadius="md" p={2} mb={2}>
                      <Text fontWeight="bold">{String(feedback.user)}</Text>
                      <Text>{String(feedback.comment)}</Text>
                    </Box>
                  ))}
                  <HStack spacing={4} mt={4}>
                    <Input
                      placeholder="Enter your feedback"
                      value={feedbackInputs[product.id] || ''}
                      onChange={(e) => handleFeedbackInputChange(product.id, e.target.value)}
                    />
                    <Button colorScheme="teal" onClick={() => handleAddFeedback(product.id)}>
                      Add
                    </Button>
                  </HStack>
                </VStack>
              )}
            </Box>
          </Flex>
        ))
      )}
    </Box>
  );
}

export default Suggestions;
