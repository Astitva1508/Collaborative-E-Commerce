import React from 'react';
import { Box, Flex, Link, Spacer, Button, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ onEnterCollaborativeMode }) => {
  return (
    <Box bg="purple.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="lg">
            E-Commerce
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Link
            as={Button}
            onClick={() => onEnterCollaborativeMode()}
            colorScheme="teal"
            variant="outline"
            mr={4}
          >
            Collaborative Mode
          </Link>
          <Link as={RouterLink} to="/login" color="white" mr={4}>
            Login
          </Link>
          <Link as={RouterLink} to="/signup" color="white">
            Signup
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
