import React, { useEffect, useRef, useState } from 'react';
import {
  Box, IconButton, Tooltip, Flex, Text, useToast, Popover, PopoverTrigger, PopoverContent, PopoverArrow,
  PopoverCloseButton, PopoverHeader, PopoverBody, List, ListItem, Button, useDisclosure, AlertDialog, AlertDialogBody,
  AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Heading
} from '@chakra-ui/react';
import { FiShoppingCart, FiMic, FiMicOff } from 'react-icons/fi';
import { IoMdExit } from "react-icons/io";
import { GrGroup } from "react-icons/gr";
import { MdExitToApp, MdOutlineFeedback } from 'react-icons/md';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';

const CollaborativeRoomPopup = ({ setCollaborativeMode, inRoomMembers, setInRoomMembers }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const canvasRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [mutedMembers, setMutedMembers] = useState([]);

  const { isOpen: isExitOpen, onOpen: onExitOpen, onClose: onExitClose } = useDisclosure();
  const { isOpen: isKickOpen, onOpen: onKickOpen, onClose: onKickClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToKick, setUserToKick] = useState(null);

  useEffect(() => {
    let audioStream;

    if (isMicOn) {
      const initMic = async () => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);

        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = context.createMediaStreamSource(audioStream);
        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 256;

        source.connect(analyserNode);

        const bufferLength = analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
          analyserNode.getByteTimeDomainData(dataArray);

          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasCtx = canvas.getContext('2d');
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'white';

            canvasCtx.beginPath();
            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            dataArray.forEach((item, i) => {
              const v = item / 128.0;
              const y = (v * canvas.height) / 2;

              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }

              x += sliceWidth;
            });

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
          }

          requestAnimationFrame(draw);
        };

        draw();
      };

      initMic();
    } else {
      if (audioContext) {
        audioContext.close();
        setAudioContext(null);
      }
    }

    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isMicOn]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: isMicOn ? 'Microphone Off' : 'Microphone On',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleExit = () => {
    onExitOpen();
  };

  const confirmExit = () => {
    onExitClose();
    setCollaborativeMode(false);
    toast({
      title: 'You have exited the collaborative mode.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
    navigate('/');
  };

  const handleMuteUnmute = (username) => {
    if (mutedMembers.includes(username)) {
      setMutedMembers(mutedMembers.filter(user => user !== username));
      toast({
        title: `${username} unmuted.`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else {
      setMutedMembers([...mutedMembers, username]);
      toast({
        title: `${username} muted.`,
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleKick = (username) => {
    setUserToKick(username);
    onKickOpen();
  };

  const confirmKick = () => {
    const newMembers = inRoomMembers.filter(user => user != userToKick);
    setInRoomMembers(newMembers);
    onKickClose();
    toast({
      title: `${userToKick} has been kicked out.`,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
    // Implement your logic to remove the user from the room here
  };

  return (
    <>
      <Draggable>
        <Box
          position="fixed"
          bottom="12"
          right="12"
          bg="primary.500"
          color="white"
          p={4}
          borderRadius="lg"
          shadow="2xl"
          zIndex='2'
        >

          <Flex justifyContent="space-between" alignItems="center" mb={2}>
            <Text fontSize="lg" fontWeight="bold">Collaborative Room</Text>
          </Flex>
          {isMicOn && (
            <Box mt={4} height="50px">
              <canvas ref={canvasRef}  height="50" />
            </Box>
          )}
          <Flex justifyContent="space-between" gap={4}>
            <Popover>
              <PopoverTrigger>
                <Box>
                  <Flex direction='column'>
                    <Tooltip label='Members' aria-label='Members'>
                      <IconButton
                        icon={<GrGroup />}
                        variant=""
                        colorScheme="whiteAlpha"
                        pt={2}
                        size="md"
                        _hover={{ transform: "translateY(-2px)" }}
                      />
                    </Tooltip>
                    <Text fontSize='0.7rem'>Members</Text>
                  </Flex>
                </Box>
              </PopoverTrigger>
              <PopoverContent background='primary.400' border='none'>
                <PopoverCloseButton />
                <PopoverHeader fontWeight='bold'>Members</PopoverHeader>
                <PopoverBody >
                  <List spacing={3}>
                    {inRoomMembers.map((member, key) => (
                      <ListItem key={key} display="flex" alignItems="center" justifyContent="space-between">
                        <Text>{member}</Text>
                        <Flex>
                          <IconButton
                            icon={mutedMembers.includes(member) ? <FiMicOff /> : <FiMic />}
                            size="sm"
                            colorScheme={mutedMembers.includes(member) ? "red" : "teal"}
                            variant="none"
                            mr={2}
                            onClick={() => handleMuteUnmute(member)}
                          />
                          <IconButton
                            icon={<MdExitToApp />}
                            size="sm"
                            colorScheme="red"
                            variant="none"
                            onClick={() => handleKick(member)}
                          />
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Flex direction='column' alignItems='center'>
              <Tooltip label="Shared Cart" aria-label="Shared Cart">
                <IconButton
                  icon={<FiShoppingCart />}
                  variant=""
                  colorScheme="whiteAlpha"
                  onClick={() => navigate('/common-cart')}
                  size="md"
                  _hover={{ transform: "translateY(-2px)" }}
                  pt={2}
                />
              </Tooltip>
              <Text fontSize='0.7rem'>Shared</Text>
            </Flex>
            <Flex direction='column' alignItems='center'>

              <Tooltip label="Suggestions/Feedbacks" aria-label="Suggestions">
                <IconButton
                  icon={<MdOutlineFeedback />}
                  variant=""
                  colorScheme="whiteAlpha"
                  onClick={() => navigate('/suggestions')}
                  size="md"
                  pt={2}
                  _hover={{ transform: "translateY(-2px)" }}
                />
              </Tooltip>
              <Text fontSize='0.7rem'>Suggestions</Text>
            </Flex>
            <Flex direction='column' alignItems='center'>

              <Tooltip label={isMicOn ? "Turn Off Mic" : "Turn On Mic"} aria-label="Mic">
                <IconButton
                  icon={isMicOn ? <FiMicOff /> : <FiMic />}
                  variant=""
                  colorScheme="whiteAlpha"
                  size="md"
                  pt={4}
                  _hover={{ transform: "translateY(-2px)" }}
                  onClick={toggleMic}
                />
              </Tooltip>
              <Text fontSize='0.7rem'>{isMicOn ? "Mute" : "Unmute"}</Text>
            </Flex>
            <Flex direction='column' alignItems='center'>

              <Tooltip label="Exit" aria-label="Exit">
                <IconButton
                  icon={<IoMdExit />}
                  variant=""
                  colorScheme="whiteAlpha"
                  onClick={handleExit}
                  pt={2}
                  size="md"
                  _hover={{ transform: "translateY(-2px)" }}
                />
              </Tooltip>
              <Text fontSize='0.7rem'>Exit</Text>
            </Flex>
          </Flex>
        </Box>
      </Draggable>

      {/* Exit Confirmation Dialog */}
      <AlertDialog
        isOpen={isExitOpen}
        leastDestructiveRef={cancelRef}
        onClose={onExitClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Exit Collaborative Mode
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to exit the collaborative mode? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onExitClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmExit} ml={3}>
                Yes, Exit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Kick Confirmation Dialog */}
      <AlertDialog
        isOpen={isKickOpen}
        leastDestructiveRef={cancelRef}
        onClose={onKickClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Kick User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to kick {userToKick} out of the room?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onKickClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmKick} ml={3}>
                Kick
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CollaborativeRoomPopup;
