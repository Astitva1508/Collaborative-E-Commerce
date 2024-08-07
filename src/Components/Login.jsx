import React, { useState } from 'react';
import { Box, Input, Button, Heading, FormControl, FormLabel, Text, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './../Context/UserContext'; // Import the UserContext

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser(); // Get login function from context
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    login(userId); // Update context and localStorage
    navigate('/'); // Redirect to homepage
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>

        <FormControl id="userId" mb={4}>
          <FormLabel>User ID</FormLabel>
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
          />
        </FormControl>

        <FormControl id="password" mb={6}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        <Button colorScheme="teal" width="full" mb={4} onClick={handleLogin}>
          Login
        </Button>

        <Text textAlign="center">
          Don't have an account?{' '}
          <Link to="/signup">
            <Button variant="link" colorScheme="teal">
              Sign Up
            </Button>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
