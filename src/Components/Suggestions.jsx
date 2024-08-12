import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Divider,
  Image,
  HStack,
  Input,
  Button
} from '@chakra-ui/react';

// Assuming you have a UserContext
import { useUser } from './../Context/UserContext';

const product = {
  name: 'Sample Product',
  description: 'This is a sample product description.',
  image: 'https://picsum.photos/200/300', // Placeholder image
  price: '$49.99',
};

const suggestedBy = ['Alice', 'Bob', 'Charlie'];
const suggestedTo = ['Dave', 'Eve', 'Frank'];

function Suggestions({inRoomMembers}) {
  const [viewSuggestions, setViewSuggestions] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackInput, setFeedbackInput] = useState('');
  
  // Use context to get the current user's username
  const { user } = useUser();

  useEffect(() => {
    // Load feedbacks from localStorage when the component mounts
    const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    setFeedbacks(storedFeedbacks);
  }, []);

  const handleAddFeedback = () => {
    if (feedbackInput.trim() === '' || !user) return;

    const newFeedback = { user: String(user.id), comment: String(feedbackInput) };
    const updatedFeedbacks = [...feedbacks, newFeedback];

    setFeedbacks(updatedFeedbacks);
    setFeedbackInput('');

    // Save feedbacks to localStorage
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
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
        <Flex>
          {/* Left Side - Product Details */}
          <Box flex="1" p={4} border="1px solid #e2e8f0" borderRadius="md">
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              {product.name}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              {product.description}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {product.price}
            </Text>
          </Box>

          {/* Right Side - Suggestions Info */}
          <Box flex="1" p={4} ml={4} border="1px solid #e2e8f0" borderRadius="md">
            <VStack align="start">
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Suggested By
                </Text>
                <VStack align="start">
                  {suggestedBy.map((user, index) => (
                    <Text key={index}>{user}</Text>
                  ))}
                </VStack>
              </Box>
              <Divider />
              <Box mt={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Suggested To
                </Text>
                <VStack align="start">
                  {suggestedTo.map((user, index) => (
                    <Text key={index}>{user}</Text>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Flex>
      ) : (
        <Flex>
          {/* Left Side - Product Details */}
          <Box flex="1" p={4} border="1px solid #e2e8f0" borderRadius="md">
            <Image src={product.image} alt={product.name} borderRadius="md" mb={4} />
            <Text fontSize="xl" fontWeight="bold">
              {product.name}
            </Text>
            <Text fontSize="md" color="gray.600" mb={2}>
              {product.description}
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="teal.500">
              {product.price}
            </Text>
          </Box>

          {/* Right Side - Feedbacks Info */}
          <Box flex="1" p={4} ml={4} border="1px solid #e2e8f0" borderRadius="md">
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Feedbacks
            </Text>
            {feedbacks.length === 0 ? (
              <VStack align="start" spacing={2}>
                <Text>No feedbacks available.</Text>
                <HStack spacing={4} mt={4}>
                  <Input
                    placeholder="Enter your feedback"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                  />
                  <Button colorScheme="teal" onClick={handleAddFeedback}>
                    Add
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <VStack align="start" spacing={2}>
                {feedbacks.map((feedback, index) => (
                  <Box key={index} borderWidth="1px" borderRadius="md" p={2} mb={2}>
                    <Text fontWeight="bold">{String(feedback.user)}</Text>
                    <Text>{String(feedback.comment)}</Text>
                  </Box>
                ))}
                <HStack spacing={4} mt={4}>
                  <Input
                    placeholder="Enter your feedback"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                  />
                  <Button colorScheme="teal" onClick={handleAddFeedback}>
                    Add
                  </Button>
                </HStack>
              </VStack>
            )}
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default Suggestions;
