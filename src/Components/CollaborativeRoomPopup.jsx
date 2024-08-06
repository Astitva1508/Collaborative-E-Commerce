import React from 'react';
import { Box, IconButton, Tooltip, Flex, Text } from '@chakra-ui/react';
import { BellIcon, ChatIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';

const CollaborativeRoomPopup = ({ onExit }) => {
  const navigate = useNavigate();

  return (
    <Draggable>
      <Box position="fixed" bottom="4" right="4" bg="purple.700" color="white" p={4} borderRadius="lg" shadow="2xl" zIndex="9999" maxWidth="300px" >
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold">Collaborative Room</Text>
          <IconButton 
            icon={<CloseIcon />} 
            variant="ghost" 
            colorScheme="whiteAlpha" 
            onClick={onExit} 
            size="sm" 
          />
        </Flex>
        <Flex justifyContent="space-between">
          <Tooltip label="Mute Notifications" aria-label="Mute">
            <IconButton 
              icon={<BellIcon />} 
              variant="ghost" 
              colorScheme="whiteAlpha" 
              onClick={() => alert('Notifications Muted')} 
              size="lg" 
            />
          </Tooltip>
          <Tooltip label="Chat" aria-label="Chat">
            <IconButton 
              icon={<ChatIcon />} 
              variant="ghost" 
              colorScheme="whiteAlpha" 
              onClick={() => navigate('/chat')} 
              size="lg" 
            />
          </Tooltip>
          <Tooltip label="Shared Cart" aria-label="Shared Cart">
            <IconButton 
              icon={<AddIcon />} 
              variant="ghost" 
              colorScheme="whiteAlpha" 
              onClick={() => navigate('/shared-cart')} 
              size="lg" 
            />
          </Tooltip>
          <Tooltip label="Suggestions/Feedbacks" aria-label="Suggestions">
            <IconButton 
              icon={<ChatIcon />} 
              variant="ghost" 
              colorScheme="whiteAlpha" 
              onClick={() => navigate('/feedback')} 
              size="lg" 
            />
          </Tooltip>
        </Flex>
      </Box>
    </Draggable>
  );
};

export default CollaborativeRoomPopup;
