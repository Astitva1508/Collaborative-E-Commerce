import React, { useState } from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  Text,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  IconButton,
  useDisclosure,
  Divider,
  Tooltip
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from './../Context/UserContext';
import { FaTrash, FaBell } from 'react-icons/fa'; // For delete and notification icons

const Navbar = ({ onEnterCollaborativeMode }) => {
  const { user, logout } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);

  const handleInvite = () => {
    if (username.trim() !== '') {
      setUserList([...userList, username]);
      setUsername('');
      setNotifications([...notifications, `Invited ${username}`]); // Add a notification
    }
  };

  const handleRemove = (userToRemove) => {
    setUserList(userList.filter(user => user !== userToRemove));
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
  };

  const handleDone = () => {
    onEnterCollaborativeMode(); // Enable Collaborative Mode
    setUserList([]); // Clear the list after inviting
    onClose(); // Close the modal
  };

  return (
    <>
      <Box bg="teal.600" px={4} py={2}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo and Home Link */}
          <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="lg">
            E-Commerce
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
                    variant="ghost"
                    colorScheme="whiteAlpha"
                    onClick={toggleNotifications}
                    size="lg"
                    mr={4}
                    _hover={{ transform: "translateY(-2px)" }}
                  />
                </Tooltip>

                {/* Collaborative Mode Button */}
                <Button
                  color="#fff"
                  variant="outline"
                  mr={4}
                  onClick={onOpen}
                  _hover={{ background: "teal.800" }}
                >
                  Collaborative Mode
                </Button>
                <Button
                  color="#fff"
                  variant="outline"
                  onClick={logout}
                  _hover={{ background: "teal.800" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link as={RouterLink} to="/login" mr={4}>
                  <Button variant="link" color="white" fontWeight="medium">
                    Login
                  </Button>
                </Link>
                <Link as={RouterLink} to="/signup">
                  <Button colorScheme="teal">
                    Signup
                  </Button>
                </Link>
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
          <ModalHeader>Collaborative Mode</ModalHeader>
          <ModalBody>
            <FormControl id="username" mb={4}>
              <FormLabel>Enter Username to Invite</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </FormControl>
            <Button
              colorScheme="teal"
              mb={4}
              onClick={handleInvite}
              isDisabled={!username.trim()}
            >
              Add
            </Button>
            <Divider mb={4} />
            <List spacing={3}>
              {userList.map((user, index) => (
                <ListItem key={index} display="flex" alignItems="center" justifyContent="space-between">
                  <Text>{user}</Text>
                  <IconButton
                    icon={<FaTrash />}
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={() => handleRemove(user)}
                  />
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleDone}>
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
