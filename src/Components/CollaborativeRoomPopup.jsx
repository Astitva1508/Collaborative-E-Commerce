import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Tooltip, Flex, Text, useToast } from '@chakra-ui/react';
import { FiShoppingCart, FiMic, FiMicOff } from 'react-icons/fi';
import { IoMdExit } from "react-icons/io";
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';
import { MdOutlineFeedback } from 'react-icons/md';

// eslint-disable-next-line react/prop-types
const CollaborativeRoomPopup = ({ onExit }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [isMicOn, setIsMicOn] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const canvasRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

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
    onOpen();
  };

  const confirmExit = () => {
    onClose();
    if (onExit) {
      onExit();
    }
    toast({
      title: 'You have exited the collaborative mode.',
      status: 'warning',
      duration: 2000,
      isClosable: true,
    });
    navigate('/');
  };

  return (
    <>
      <Draggable>
        <Box
          position="fixed"
          bottom="8"
          right="8"
          bg="teal.500"
          color="white"
          p={4}
          borderRadius="lg"
          shadow="2xl"
          zIndex="9999"
          maxWidth="300px"
        >
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="bold">Collaborative Room</Text>
          </Flex>
          {/* Sound Wave Visualization */}
          {isMicOn && (
            <Box mt={4} height="50px">
              <canvas ref={canvasRef} width="190" height="50" />
            </Box>
          )}
          <Flex justifyContent="space-between">
            <Tooltip label="Shared Cart" aria-label="Shared Cart">
              <IconButton
                icon={<FiShoppingCart />}
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={() => navigate('/common-cart')}
                size="lg"
                _hover={{ transform: "translateY(-5px)" }}

              />
            </Tooltip>
            <Tooltip label="Suggestions/Feedbacks" aria-label="Suggestions">
              <IconButton
                icon={<MdOutlineFeedback />}
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={() => navigate('/suggestions')}
                size="lg"
                _hover={{ transform: "translateY(-5px)" }}

              />
            </Tooltip>
            <Tooltip label={isMicOn ? "Turn Off Mic" : "Turn On Mic"} aria-label="Mic">
              <IconButton
                icon={isMicOn ? <FiMicOff /> : <FiMic />}
                variant="ghost"
                colorScheme="whiteAlpha"
                size="lg"
                _hover={{ transform: "translateY(-5px)" }}
                onClick={toggleMic}
              />
            </Tooltip>
            <Tooltip label="Exit" aria-label="Exit">
              <IconButton
                icon={<IoMdExit />}
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={handleExit}
                size="lg"
                _hover={{ transform: "translateY(-5px)" }}

              />
            </Tooltip>
          </Flex>
        </Box>
      </Draggable>

      {/* Exit Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
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
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmExit} ml={3}>
                Yes, Exit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CollaborativeRoomPopup;
