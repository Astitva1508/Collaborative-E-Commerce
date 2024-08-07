import React, { useState } from 'react';
import { Box, Heading, Text, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignup = () => {
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear any previous errors

    // Handle the signup logic here (e.g., send data to the server)
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    // Clear form fields after submission
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <Box p={8} maxWidth="400px" margin="0 auto" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={6}>
        Sign Up
      </Heading>

      {/* Display Error Message */}
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <FormControl id="username" mb={4}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
      </FormControl>

      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </FormControl>

      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>

      <FormControl id="confirm-password" mb={6}>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />
      </FormControl>

      <Button colorScheme="teal" width="full" onClick={handleSignup}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
