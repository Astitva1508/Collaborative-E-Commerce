import React, { useState } from 'react';
import { Box, useToast, Flex, Link, Button, Text, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, List, ListItem, IconButton, useDisclosure, Divider, Tooltip, } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from './../Context/UserContext';
import { FaTrash, FaBell, FaShoppingCart } from 'react-icons/fa'; // For delete and notification icons
import { GrStatusCritical, GrStatusGoodSmall } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = ({ setCollaborativeMode, setCurrentMembers, currentMembers, setInRoomMembers, isCollaborativeMode }) => {
  const { user, logout } = useUser();
  const [flicker, setFlicker] = useState(false);
  const toast = useToast();
  const handleLogout = () => {
    setCollaborativeMode(false);
    logout();
    toast({
      title: 'You logged out!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const dummyUsers = [
    { username: 'aditya', email: 'aditya@example.com', phone: '1234567890' },
    { username: 'astitva', email: 'astitva@example.com', phone: '0987654321' },
    { username: 'rehan', email: 'rehan@example.com', phone: '1122334455' },
  ];
  useEffect(() => {
    let flickerTimeout;
  
    const startFlickering = () => {
      setFlicker(true);
      flickerTimeout = setTimeout(() => {
        setFlicker(false);
        flickerTimeout = setTimeout(startFlickering, 1000); 
      }, 1000); 
    };
  
    if (isCollaborativeMode) {
      startFlickering();
    } else {
      setFlicker(false);
      clearTimeout(flickerTimeout);
    }
  
    return () => clearTimeout(flickerTimeout); 
  }, [isCollaborativeMode]);
  
  const handleInvite = (suggestion) => {
    if (suggestion.trim() !== '') {
      setUserList((prevList) => [...prevList, suggestion]);
      setUsername(''); 
      setNotifications((prevNotifications) => [...prevNotifications, `Invited ${suggestion}`]);
      setCurrentMembers((prev) => [...prev, suggestion]);
    }
  };

  const handleRemove = (userToRemove) => {
    setUserList(userList.filter((user) => user !== userToRemove));
    setCurrentMembers(currentMembers.filter((member) => member !== userToRemove));
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
  };

  const handleDone = () => {
    if (currentMembers.length != 0) {
      setInRoomMembers(userList);
      setCollaborativeMode(true); 
      onClose(); // Close the modal
    }
  };

  const filteredSuggestions = dummyUsers
    .filter(
      (user) =>
        user.username.toLowerCase().includes(username.toLowerCase()) ||
        user.email.toLowerCase().includes(username.toLowerCase()) ||
        user.phone.includes(username)
    )
    .map((user) => user.username);

  return (
    <>
      <Box bg='primary.500' px={4} py={2}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo and Home Link */}
          <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="lg">
            Collaborative E-Commerce
          </Link>

          <Spacer />

          {/* Navigation Links */}
          <Flex alignItems="center">
            {user ? (
              <>
                <Text color="white" mr={4} fontWeight="bold">
                  Welcome, {user.id}
                </Text>

                {/* Notifications Button */}
                <Tooltip label="Notifications" aria-label="Notifications">
                  <IconButton
                    icon={<FaBell />}
                    colorScheme='white'
                    onClick={toggleNotifications}
                    size="md"
                    _hover={{ transform: 'translateY(-2px)' }}
                  />
                </Tooltip>
                <Tooltip label="personal cart" aria-label="personal cart">
                  <IconButton
                    icon={<FaShoppingCart />}
                    colorScheme="white"
                    onClick={() => navigate('/personal-cart')}
                    size="md"
                    mr={4}
                    _hover={{ transform: 'translateY(-2px)' }}
                  />
                </Tooltip>

                {/* Collaborative Mode Button */}
                <Button
                  color="#fff"
                  variant="outline"
                  mr={4}
                  onClick={onOpen}
                  _hover={{ background: 'primary.800' }}
                >
                  <Flex gap={1} alignItems='center'>Collaborative Mode
                    <GrStatusGoodSmall color={isCollaborativeMode && flicker ? 'red' : 'white'}/></Flex>
                </Button>
                <Button color="#fff" variant="outline" onClick={handleLogout} _hover={{ background: 'primary.800' }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/login">
                  <Button variant="link" color="white" fontWeight="bold" mr={4}>
                    Login
                  </Button>
                </Link>
                {/* <Link as={RouterLink} to="/signup">
                  <Button colorScheme="primary.800">Signup</Button>
                </Link> */}
              </>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <Box
          position="absolute"
          top="4.5rem"
          right="4rem"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={4}
          zIndex="1000"
        >
          <Text fontWeight="bold" mb={2}>
            Notifications
          </Text>
          {notifications.length === 0 ? (
            <Text>No notifications yet</Text>
          ) : (
            <List spacing={2}>
              {notifications.map((notification, index) => (
                <ListItem key={index}>
                  <Text>{notification}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {/* Collaborative Mode Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Collaborative Mode </ModalHeader>
          <ModalBody>
            <FormControl id="username" mb={4}>
              <FormLabel>Enter Username/Email/Phone to Invite</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              {username && (
                <List spacing={2} mt={2}>
                  {filteredSuggestions.map((suggestion, index) => (
                    <ListItem
                      key={index}
                      onClick={() => handleInvite(suggestion)}
                      cursor="pointer"
                      _hover={{ background: 'gray.100' }}
                      p={2}
                      borderRadius="md"
                    >
                      {suggestion}
                    </ListItem>
                  ))}
                </List>
              )}
            </FormControl>
            <Divider mb={4} />
            <List spacing={3}>
              {userList.map((user, index) => (
                <ListItem key={index} display="flex" alignItems="center" justifyContent="space-between">
                  <Text>{user}</Text>
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="black"
                    variant="outline"
                    onClick={() => handleRemove(user)}
                  />
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={handleDone}>
              Invite All
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
